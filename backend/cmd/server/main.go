package main

import (
	"log"

	"leprechaun/internal/app"
)

func main() {
	application, err := app.New()
	if err != nil {
		log.Fatalf("failed to initialize app: %v", err)
	}

	log.Println("Server starting on", application.Server.Addr)

	if err := application.Server.ListenAndServe(); err != nil {
		log.Fatalf("server failed: %v", err)
	}
}
