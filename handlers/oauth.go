package handlers

import (
	"context"
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

func GoogleOauthConfig() *oauth2.Config {
	return &oauth2.Config{
		RedirectURL:  "http://localhost:5050/auth/google/callback",
		ClientID:     os.Getenv("CLIENT_ID"),
		ClientSecret: os.Getenv("CLIENT_SECRET"),
		Scopes:       []string{"https://www.googleapis.com/auth/userinfo.email"},
		Endpoint:     google.Endpoint,
	}
}

const oauthGoogleUrlAPI = "https://www.googleapis.com/oauth2/v2/userinfo?access_token="

func OauthGoogleLogin(w http.ResponseWriter, r *http.Request) {

	oauthState := generateStateOauthCookie(w)

	u := GoogleOauthConfig().AuthCodeURL(oauthState)
	http.Redirect(w, r, u, http.StatusTemporaryRedirect)
}

func OauthGoogleCallback(w http.ResponseWriter, r *http.Request) {
	oauthState, _ := r.Cookie("oauthstate")

	if r.FormValue("state") != oauthState.Value {
		log.Println("invalid oauth google state")
		http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
		return
	}

	token, err := GoogleOauthConfig().Exchange(context.Background(), r.FormValue("code"))
	if err != nil {
		fmt.Printf("code exchange wrong: %s", err.Error())
	}

	http.SetCookie(w, &http.Cookie{
		Name:    "access_token",
		Path:    "/",
		Value:   token.AccessToken,
		Expires: time.Now().Add(time.Hour * 24),
	})

	w.Header().Set("Location", "/")
	w.WriteHeader(http.StatusFound)

}

func generateStateOauthCookie(w http.ResponseWriter) string {
	var expiration = time.Now().Add(20 * time.Minute)

	b := make([]byte, 16)
	rand.Read(b)
	state := base64.URLEncoding.EncodeToString(b)
	cookie := http.Cookie{Name: "oauthstate", Value: state, Expires: expiration, Path: "/"}
	http.SetCookie(w, &cookie)

	return state
}
