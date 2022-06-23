package main

import (
	"embed"
	"io/fs"
	"log"
	"net/http"

	"github.com/gin-gonic/contrib/sessions"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/igors-wix/deckster/handlers"
)

//go:embed web/www/*
var statics embed.FS

type embedFileSystem struct {
	http.FileSystem
}

func (e embedFileSystem) Exists(prefix string, path string) bool {
	_, err := e.Open(path)
	return err == nil
}

func EmbedFolder(fsEmbed embed.FS, targetPath string) static.ServeFileSystem {
	fsys, err := fs.Sub(fsEmbed, targetPath)
	if err != nil {
		panic(err)
	}
	return embedFileSystem{
		FileSystem: http.FS(fsys),
	}
}

func main() {

	router := gin.Default()
	token, err := handlers.RandToken(64)
	if err != nil {
		log.Fatal("unable to generate random token: ", err)
	}
	store := sessions.NewCookieStore([]byte(token))
	store.Options(sessions.Options{
		Path:   "/",
		MaxAge: 86400 * 7,
	})
	router.Use(gin.Logger())
	router.Use(gin.Recovery())
	router.Use(sessions.Sessions("goquestsession", store))

	router.Use(static.Serve("/", EmbedFolder(statics, "web/www")))
	router.NoRoute(func(c *gin.Context) {

		distFS, err := fs.Sub(statics, "web/www")
		if err != nil {
			log.Fatal(err)
		}
		fileServer := http.FileServer(http.FS(distFS))

		c.Request.URL.Path = "/"
		c.Writer.Header().Set("Content-Type", "text/html")
		fileServer.ServeHTTP(c.Writer, c.Request)
	})
	router.GET("/oauth/login", handlers.LoginHandler)
	router.GET("/oauth/callback", handlers.AuthHandler)
	// router.GET("/api/slide", handlers.GetSlide) // TODO:
	router.GET("/api/me", handlers.GetUserProfile)

	if err := router.Run("127.0.0.1:5050"); err != nil {
		log.Fatal(err)
	}

}
