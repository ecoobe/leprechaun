#!/bin/bash
set -e

# ----------------------------------------
# Переменные
# ----------------------------------------
EMAIL="easyarm@yandex.ru"
DOMAINS=("leprec.ru" "www.leprec.ru" "prometheus.leprec.ru" "grafana.leprec.ru" "node-exporter.leprec.ru")
COMPOSE="docker compose"
PROJECT_DIR="$(pwd)"

# Функция для проверки доступности контейнера
wait_for_container() {
    local name=$1
    local port=$2
    echo "Ожидаем контейнер $name на порту $port..."
    until $COMPOSE exec -T $name sh -c "curl -s http://localhost:$port/ >/dev/null" >/dev/null 2>&1; do
    	sleep 2
    done
    echo "Контейнер $name готов!"
}

# ----------------------------------------
# 1️⃣ Очищаем старые контейнеры и сети
# ----------------------------------------
echo "Останавливаем старые контейнеры и удаляем сети..."
$COMPOSE down -v || true
docker network prune -f || true

# ----------------------------------------
# 2️⃣ Сборка и запуск backend и frontend
# ----------------------------------------
echo "Собираем и запускаем backend и frontend..."
$COMPOSE up -d --build backend frontend

# Ждем пока backend и frontend будут доступны
wait_for_container backend 8080
wait_for_container frontend 80

# ----------------------------------------
# 3️⃣ Запуск Nginx
# ----------------------------------------
echo "Запускаем Nginx..."
$COMPOSE up -d nginx

# Ждем пока Nginx поднимется
sleep 5

# ----------------------------------------
# 4️⃣ Получение сертификатов через Certbot
# ----------------------------------------
echo "Получаем SSL сертификаты..."
DOMAIN_ARGS=()
for d in "${DOMAINS[@]}"; do
    DOMAIN_ARGS+=("-d" "$d")
done

$COMPOSE run --rm certbot certonly \
    --webroot --webroot-path=/var/www/certbot \
    --email "$EMAIL" --agree-tos --no-eff-email \
    "${DOMAIN_ARGS[@]}"

# ----------------------------------------
# 5️⃣ Перезапуск Nginx, чтобы подхватил сертификаты
# ----------------------------------------
echo "Перезапускаем Nginx..."
$COMPOSE restart nginx

echo "✅ Деплой завершен!"
echo "Сертификаты сохранены в ./certbot/conf/live/"