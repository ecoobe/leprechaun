# ===============================
# Stage 1 — build Next.js
# ===============================
FROM node:20-alpine AS builder

WORKDIR /app

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ .
RUN npm run build

# ===============================
# Stage 2 — nginx static server
# ===============================
FROM nginx:alpine

# Удаляем дефолтный конфиг
RUN rm /etc/nginx/conf.d/default.conf

# Кладём наш конфиг
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Кладём билд
COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 80