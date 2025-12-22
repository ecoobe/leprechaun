#!/bin/bash
set -e

EMAIL="easyarm@yandex.ru"
DOMAINS=("leprec.ru" "www.leprec.ru" "prometheus.leprec.ru" "grafana.leprec.ru" "node-exporter.leprec.ru")
COMPOSE="docker compose"

# ----------------------------------------
# Получаем IP контейнера
# ----------------------------------------
get_container_ip() {
    local name=$1
    docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' "${name}"
}

# ----------------------------------------
# Ждём пока контейнер отвечает на HTTP
# ----------------------------------------
wait_for_container() {
    local service=$1
    local port=$2
    # Получаем реальное имя контейнера через docker compose ps
    local container=$(docker compose ps -q $service)
    echo "Ожидаем контейнер $service ($container) на порту $port..."
    until docker exec -T $container sh -c "curl -s http://localhost:$port/ >/dev/null" >/dev/null 2>&1; do
        sleep 2
    done
    echo "Контейнер $service готов!"
}

echo "Останавливаем старые контейнеры и очищаем сети..."
$COMPOSE down -v || true
docker network prune -f || true

echo "Собираем и запускаем backend и frontend..."
$COMPOSE up -d --build backend frontend

wait_for_container backend 8080
wait_for_container frontend 80

echo "Запускаем Nginx..."
$COMPOSE up -d nginx
sleep 5

echo "Получаем SSL сертификаты..."
DOMAIN_ARGS=()
for d in "${DOMAINS[@]}"; do
    DOMAIN_ARGS+=("-d" "$d")
done

$COMPOSE run --rm certbot certonly \
    --webroot --webroot-path=/var/www/certbot \
    --email "$EMAIL" --agree-tos --no-eff-email \
    "${DOMAIN_ARGS[@]}"

echo "Перезапускаем Nginx для подхвата сертификатов..."
$COMPOSE restart nginx

echo "✅ Деплой завершен!"
echo "Сертификаты сохранены в ./certbot/conf/live/"