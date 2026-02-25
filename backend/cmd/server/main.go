package main

import (
	"log"

	"leprechaun/internal/app"
)

func main() {
	application, err := app.New()
	if err != nil {
		log.Fatalf("failed to initialize application: %v", err)
	}

	log.Println("Server starting...")

	if err := application.Server.ListenAndServe(); err != nil {
		log.Fatalf("server failed: %v", err)
	}
}
