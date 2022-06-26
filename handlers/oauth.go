package handlers

import (
	"context"
	"crypto/rand"
	"encoding/base64"
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/igors-wix/deckster/structs"
	"github.com/joho/godotenv"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

var conf *oauth2.Config
var token *oauth2.Token

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Some error occured. Err: %s", err)
	}
	conf = &oauth2.Config{
		ClientID:     os.Getenv("CLIENT_ID"),
		ClientSecret: os.Getenv("CLIENT_SECRET"),
		RedirectURL:  "http://localhost:5050/oauth/callback",
		Scopes: []string{
			"https://www.googleapis.com/auth/userinfo.email",
			"https://www.googleapis.com/auth/presentations.readonly",
		},
		Endpoint: google.Endpoint,
	}
}

func IndexHandler(c *gin.Context) {
	c.HTML(http.StatusOK, "index.html", gin.H{})
}

func RandToken(l int) (string, error) {
	b := make([]byte, l)
	if _, err := rand.Read(b); err != nil {
		return "", err
	}
	return base64.StdEncoding.EncodeToString(b), nil
}

func getLoginURL(state string) string {
	return conf.AuthCodeURL(state)
}

func LoginHandler(c *gin.Context) {
	state, err := RandToken(32)
	if err != nil {
		println("Error while generating random data.")
		return
	}
	session := sessions.Default(c)
	session.Set("state", state)
	err = session.Save()
	if err != nil {
		println("Error while saving session.")
		return
	}
	link := getLoginURL(state)
	c.Redirect(http.StatusMovedPermanently, link)
}

func AuthHandler(c *gin.Context) {
	session := sessions.Default(c)
	retrievedState := session.Get("state")
	queryState := c.Request.URL.Query().Get("state")
	if retrievedState != queryState {
		log.Printf("Invalid session state: retrieved: %s; Param: %s", retrievedState, queryState)
		return
	}

	code := c.Request.URL.Query().Get("code")
	tok, err := conf.Exchange(context.Background(), code)
	if err != nil {
		log.Println("Login failed. Please try again.")
		return
	}

	client := conf.Client(oauth2.NoContext, tok)
	userinfo, err := client.Get("https://www.googleapis.com/oauth2/v3/userinfo")
	if err != nil {
		log.Println(err)
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}
	defer userinfo.Body.Close()
	data, _ := ioutil.ReadAll(userinfo.Body)
	u := structs.User{}
	if err = json.Unmarshal(data, &u); err != nil {
		log.Println(err)
		return
	}
	session.Set("user-id", u.Email)
	err = session.Save()
	if err != nil {
		log.Println(err)
		return
	}

	http.SetCookie(c.Writer, &http.Cookie{
		Name:    "access_token",
		Path:    "/",
		Value:   tok.AccessToken,
		Expires: time.Now().Add(time.Hour * 24),
	})

	http.Header.Add(http.Header{}, "Location", "/login")
	http.Redirect(c.Writer, c.Request, "/login", http.StatusFound)
}
