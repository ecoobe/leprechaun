FROM golang:1.25-alpine AS builder

RUN apk add --no-cache curl
WORKDIR /app

#Копируем файлы зависимостей и загружаем модули
COPY backend/go.mod backend/go.sum ./
RUN GOPROXY=https://proxy.golang.org,direct go mod download

COPY backend/ ./

RUN go build -o /server ./cmd/server

EXPOSE 8080

CMD ["/server"]