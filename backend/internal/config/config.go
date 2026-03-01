package config

import (
	"log"
	"os"
)

type Config struct {
	AppPort string

	DBHost     string
	DBPort     string
	DBUser     string
	DBPassword string
	DBName     string

	JWTSecret string

	// Telegram OAuth
	TelegramBotToken string
	TelegramBotName  string
}

func Load() *Config {
	cfg := &Config{
		AppPort: getEnv("APP_PORT", "8080"),

		DBHost:     getEnv("DB_HOST", "postgres"),
		DBPort:     getEnv("DB_PORT", "5432"),
		DBUser:     getEnv("DB_USER", "leprechaun"),
		DBPassword: getEnv("DB_PASSWORD", "secret"),
		DBName:     getEnv("DB_NAME", "leprechaun"),

		JWTSecret: getEnv("JWT_SECRET", "supersecret"),

		TelegramBotToken: getEnv("TELEGRAM_BOT_TOKEN", ""),
		TelegramBotName:  getEnv("TELEGRAM_BOT_NAME", ""),
	}

	log.Println("Configuration loaded")
	return cfg
}

func getEnv(key, fallback string) string {
	value := os.Getenv(key)
	if value == "" {
		return fallback
	}
	return value
}
