#!/bin/bash
set -e

EMAIL="easyarm@yandex.ru"
DOMAINS=("leprec.ru" "www.leprec.ru" "prometheus.leprec.ru" "grafana.leprec.ru" "node-exporter.leprec.ru")
COMPOSE="docker compose"

# ----------------------------------------
# Ждём пока контейнер отвечает на HTTP
# ----------------------------------------
wait_for_container() {
    local name=$1
    local port=$2
    echo "Ожидаем контейнер $name..."
    until docker compose exec "$name" curl -s "http://localhost:$port/" >/dev/null 2>&1; do
        sleep 2
    done
    echo "Контейнер $name готов!"
}

echo "Создаем папки для certbot..."
mkdir -p ./certbot/www ./certbot/conf

echo "Останавливаем старые контейнеры и очищаем сети..."
$COMPOSE down -v || true

echo "Собираем и запускаем backend и frontend..."
$COMPOSE up -d --build backend frontend

wait_for_container backend 8080
wait_for_container frontend 80

echo "Запускаем Nginx..."
$COMPOSE up -d nginx

# Ждем пока nginx стартует
sleep 5

# Проверяем, что nginx работает
echo "Проверяем nginx..."
curl -f http://localhost || echo "Nginx не отвечает, но продолжаем..."

echo "Получаем SSL сертификаты в тестовом режиме (staging)..."
DOMAIN_ARGS=()
for d in "${DOMAINS[@]}"; do
    DOMAIN_ARGS+=("-d" "$d")
done

# Сначала попробуем в staging режиме
$COMPOSE run --rm certbot certonly \
    --webroot --webroot-path=/var/www/certbot \
    --email "$EMAIL" --agree-tos --no-eff-email \
    --staging \
    "${DOMAIN_ARGS[@]}"

if [ $? -eq 0 ]; then
    echo "Тестовые сертификаты получены успешно!"
    
    echo "Теперь получаем настоящие сертификаты..."
    $COMPOSE run --rm certbot certonly \
        --webroot --webroot-path=/var/www/certbot \
        --email "$EMAIL" --agree-tos --no-eff-email \
        "${DOMAIN_ARGS[@]}"
else
    echo "Не удалось получить тестовые сертификаты."
    echo "Пробуем standalone режим..."
    
    # Останавливаем nginx на время получения сертификатов
    $COMPOSE stop nginx
    
    $COMPOSE run --rm --service-ports certbot certonly \
        --standalone \
        --email "$EMAIL" --agree-tos --no-eff-email \
        "${DOMAIN_ARGS[@]}"
    
    # Запускаем nginx обратно
    $COMPOSE start nginx
fi

echo "Проверяем полученные сертификаты..."
if [ -d "./certbot/conf/live/leprec.ru" ]; then
    echo "Сертификаты найдены в ./certbot/conf/live/leprec.ru/"
    ls -la "./certbot/conf/live/leprec.ru/"
else
    echo "Сертификаты не найдены. Проверьте логи выше."
    exit 1
fi

echo "Перезапускаем Nginx для подхвата сертификатов..."
$COMPOSE restart nginx

echo "✅ Деплой завершен!"