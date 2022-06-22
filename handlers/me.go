package handlers

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

func GetUserProfile(w http.ResponseWriter, r *http.Request) {
	accessToken, _ := r.Cookie("access_token")

	response, err := http.Get(oauthGoogleUrlAPI + accessToken.Value)
	if err != nil {
		fmt.Printf("Error getting user profile: %s", err.Error())
		return
	}
	defer response.Body.Close()

	contents, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return
	}

	w.Write(contents)

}
