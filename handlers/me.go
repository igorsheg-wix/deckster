package handlers

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetUserProfile(c *gin.Context) {

	accessToken, err := c.Request.Cookie(("access_token"))
	if err != nil {
		fmt.Printf("Error getting user profile: %s", err.Error())
		return
	}

	response, err := http.Get("https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + accessToken.Value)
	if err != nil {
		fmt.Printf("Error getting user profile: %s", err.Error())
		return
	}
	defer response.Body.Close()

	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		log.Fatal(err)
	}
	c.Data(http.StatusOK, "application/json", body)
}
