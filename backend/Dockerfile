FROM golang:1.25-alpine AS builder

WORKDIR /app

# Копируем файлы зависимостей и загружаем модули
COPY backend/go.mod backend/go.sum ./
RUN GOPROXY=https://proxy.golang.org,direct go mod download

COPY backend/ ./backend/

RUN go build -o /server ./backend/cmd/server

EXPOSE 8080

CMD ["/server"]
