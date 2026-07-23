# Portfólio estático servido por nginx
FROM nginx:1.27-alpine

# Config customizada (cache de assets + headers básicos)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia o site para o webroot
COPY index.html /usr/share/nginx/html/index.html
COPY 404.html   /usr/share/nginx/html/404.html
COPY css/       /usr/share/nginx/html/css/
COPY js/        /usr/share/nginx/html/js/
COPY img/       /usr/share/nginx/html/img/
COPY cv/        /usr/share/nginx/html/cv/

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -qO- http://127.0.0.1/ >/dev/null 2>&1 || exit 1
