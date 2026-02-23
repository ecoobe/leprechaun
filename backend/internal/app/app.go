package app

import (
	"log"
	"net/http"

	"leprechaun/internal/config"
	"leprechaun/internal/db"
	httpHandler "leprechaun/internal/handlers/http"
)

type App struct {
	Server *http.Server
}

func New() (*App, error) {
	cfg := config.Load()

	dbpool, err := db.NewPostgres(cfg)
	if err != nil {
		return nil, err
	}

	mux := http.NewServeMux()

	mux.HandleFunc("/health", httpHandler.HealthHandler)

	server := &http.Server{
		Addr:    ":" + cfg.AppPort,
		Handler: mux,
	}

	log.Println("Application initialized")

	_ = dbpool // позже будем использовать

	return &App{
		Server: server,
	}, nil
}
