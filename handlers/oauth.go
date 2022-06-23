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
	// c.Writer.WriteHeader(302)
	c.Redirect(http.StatusMovedPermanently, link)
	// c.AbortWithStatus(http.StatusMovedPermanently)
	// c.HTML(http.StatusOK, "auth.tmpl", gin.H{"link": link})
}

func AuthHandler(c *gin.Context) {
	// Handle the exchange code to initiate a transport.
	session := sessions.Default(c)
	retrievedState := session.Get("state")
	queryState := c.Request.URL.Query().Get("state")
	if retrievedState != queryState {
		log.Printf("Invalid session state: retrieved: %s; Param: %s", retrievedState, queryState)
		c.HTML(http.StatusUnauthorized, "error.tmpl", gin.H{"message": "Invalid session state."})
		return
	}
	code := c.Request.URL.Query().Get("code")
	tok, err := conf.Exchange(context.Background(), code)
	if err != nil {
		log.Println(err)
		c.HTML(http.StatusBadRequest, "error.tmpl", gin.H{"message": "Login failed. Please try again."})
		return
	}

	client := conf.Client(context.Background(), tok)
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
		c.HTML(http.StatusBadRequest, "error.tmpl", gin.H{"message": "Error marshalling response. Please try agian."})
		return
	}
	session.Set("user-id", u.Email)
	err = session.Save()
	if err != nil {
		log.Println(err)
		c.HTML(http.StatusBadRequest, "error.tmpl", gin.H{"message": "Error while saving session. Please try again."})
		return
	}
	// db := database.MongoDBConnection{}
	// if _, mongoErr := db.LoadUser(u.Email); mongoErr == nil {
	// 	seen = true
	// } else {
	// 	err = db.SaveUser(&u)
	// 	if err != nil {
	// 		log.Println(err)
	// 		c.HTML(http.StatusBadRequest, "error.tmpl", gin.H{"message": "Error while saving user. Please try again."})
	// 		return
	// 	}
	// }
	token = tok
	c.Redirect(http.StatusFound, "/")
}

// -----------------------------------------------

// func GoogleOauthConfig() *oauth2.Config {
// 	return &oauth2.Config{
// 		RedirectURL:  "http://localhost:5050/auth/google/callback",
// 		ClientID:     os.Getenv("CLIENT_ID"),
// 		ClientSecret: os.Getenv("CLIENT_SECRET"),
// 		Scopes:       []string{"https://www.googleapis.com/auth/userinfo.email"},
// 		Endpoint:     google.Endpoint,
// 	}
// }

// const oauthGoogleUrlAPI = "https://www.googleapis.com/oauth2/v2/userinfo?access_token="

// func OauthGoogleLogin(w http.ResponseWriter, r *http.Request) {

// 	oauthState := generateStateOauthCookie(w)

// 	u := GoogleOauthConfig().AuthCodeURL(oauthState)
// 	http.Redirect(w, r, u, http.StatusTemporaryRedirect)
// }

// func OauthGoogleCallback(w http.ResponseWriter, r *http.Request) {
// 	oauthState, _ := r.Cookie("oauthstate")

// 	if r.FormValue("state") != oauthState.Value {
// 		log.Println("invalid oauth google state")
// 		http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
// 		return
// 	}

// 	token, err := GoogleOauthConfig().Exchange(context.Background(), r.FormValue("code"))
// 	if err != nil {
// 		fmt.Printf("code exchange wrong: %s", err.Error())
// 	}

// 	http.SetCookie(w, &http.Cookie{
// 		Name:    "access_token",
// 		Path:    "/",
// 		Value:   token.AccessToken,
// 		Expires: time.Now().Add(time.Hour * 24),
// 	})

// 	w.Header().Set("Location", "/login")
// 	w.WriteHeader(http.StatusFound)

// }

// func generateStateOauthCookie(w http.ResponseWriter) string {
// 	var expiration = time.Now().Add(20 * time.Minute)

// 	b := make([]byte, 16)
// 	rand.Read(b)
// 	state := base64.URLEncoding.EncodeToString(b)
// 	cookie := http.Cookie{Name: "oauthstate", Value: state, Expires: expiration, Path: "/"}
// 	http.SetCookie(w, &cookie)

// 	return state
// }
