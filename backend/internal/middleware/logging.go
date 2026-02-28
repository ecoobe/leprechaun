package middleware

import (
	"encoding/json"
	"net/http"
	"time"
)

func Logging(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()

		rw := &responseWriter{
			ResponseWriter: w,
			statusCode:     http.StatusOK,
		}

		next.ServeHTTP(rw, r)

		duration := time.Since(start)

		logEntry := map[string]interface{}{
			"timestamp":   time.Now().UTC().Format(time.RFC3339),
			"level":       levelFromStatus(rw.statusCode),
			"request_id":  GetRequestID(r.Context()),
			"method":      r.Method,
			"path":        r.URL.Path,
			"status":      rw.statusCode,
			"duration_ms": duration.Milliseconds(),
			"ip":          clientIP(r),
			"user_agent":  r.UserAgent(),
		}

		jsonLog, _ := json.Marshal(logEntry)
		println(string(jsonLog))
	})
}

func levelFromStatus(status int) string {
	switch {
	case status >= 500:
		return "error"
	case status >= 400:
		return "warn"
	default:
		return "info"
	}
}
