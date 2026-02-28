package middleware

import (
	"net"
	"net/http"
	"strings"
)

func clientIP(r *http.Request) string {
	// 1️⃣ Если за nginx — используем X-Forwarded-For
	if xf := r.Header.Get("X-Forwarded-For"); xf != "" {
		parts := strings.Split(xf, ",")
		return strings.TrimSpace(parts[0])
	}

	// 2️⃣ Альтернативный заголовок
	if xr := r.Header.Get("X-Real-IP"); xr != "" {
		return xr
	}

	// 3️⃣ Fallback на RemoteAddr
	host, _, err := net.SplitHostPort(r.RemoteAddr)
	if err == nil {
		return host
	}

	return r.RemoteAddr
}
