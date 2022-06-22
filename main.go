package main

import (
	"context"
	"embed"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/igors-wix/deckster/handlers"
	"github.com/joho/godotenv"
)

//go:embed web/www/*
var statics embed.FS

func main() {

	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Some error occured. Err: %s", err)
	}

	router := http.NewServeMux()

	router.HandleFunc("/auth/google/login", handlers.OauthGoogleLogin)
	router.HandleFunc("/auth/google/callback", handlers.OauthGoogleCallback)
	router.HandleFunc("/api/me", handlers.GetUserProfile)

	router.HandleFunc("/", handlers.SpaHandler("web/www", statics))

	srv := &http.Server{
		Addr:    ":5050",
		Handler: router,
	}

	done := make(chan os.Signal, 1)
	signal.Notify(done, os.Interrupt, syscall.SIGINT, syscall.SIGTERM)

	go func() {
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("listen: %s\n", err)
		}
	}()

	log.Print("Server Started")

	<-done
	log.Print("Server Stopped")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer func() {
		// extra handling here
		cancel()
	}()

	if err := srv.Shutdown(ctx); err != nil {
		log.Fatalf("Server Shutdown Failed:%+v", err)
	}
	log.Print("Server Exited Properly")
}
