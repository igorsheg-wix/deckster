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
	if err != nil {
		return false
	}
	return true
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

func IndexHandler(c *gin.Context) {
	c.HTML(http.StatusOK, "index.html", gin.H{})
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

	router.Static("/static", "./web/www/static")
	router.LoadHTMLFiles("./web/www/index.html")

	// router.Use(static.Serve("/", EmbedFolder(statics, "web/www")))
	// router.NoRoute(func(c *gin.Context) {
	// 	fmt.Printf("%s doesn't exists, redirect on /", c.Request.URL.Path)
	// 	c.Redirect(http.StatusMovedPermanently, "/")
	// })
	router.GET("/", handlers.IndexHandler)
	router.GET("/oauth/login", handlers.LoginHandler)
	router.GET("/oauth/callback", handlers.AuthHandler)
	router.GET("/api/slide", handlers.GetSlide)

	if err := router.Run("0.0.0.0:5050"); err != nil {
		log.Fatal(err)
	}

	// router.GET("/", handlers.SpaHandler("web/www", statics))
	// err := godotenv.Load()
	// if err != nil {
	// 	log.Fatalf("Some error occured. Err: %s", err)
	// }

	// router := http.NewServeMux()

	// router.HandleFunc("/auth/google/login", handlers.OauthGoogleLogin)
	// router.HandleFunc("/auth/google/callback", handlers.OauthGoogleCallback)
	// router.HandleFunc("/api/me", handlers.GetUserProfile)
	// router.HandleFunc("/api/slide", handlers.GetSlide)

	// router.HandleFunc("/", handlers.SpaHandler("web/www", statics))

	// srv := &http.Server{
	// 	Addr:    ":5050",
	// 	Handler: router,
	// }

	// done := make(chan os.Signal, 1)
	// signal.Notify(done, os.Interrupt, syscall.SIGINT, syscall.SIGTERM)

	// go func() {
	// 	if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
	// 		log.Fatalf("listen: %s\n", err)
	// 	}
	// }()

	// log.Print("Server Started")

	// <-done
	// log.Print("Server Stopped")

	// ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	// defer func() {
	// 	// extra handling here
	// 	cancel()
	// }()

	// if err := srv.Shutdown(ctx); err != nil {
	// 	log.Fatalf("Server Shutdown Failed:%+v", err)
	// }
	// log.Print("Server Exited Properly")
}
