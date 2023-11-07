FROM node:18 as frontend

WORKDIR /app/frontend

COPY frontend/package*.json .

COPY ./frontend .

RUN npm ci

RUN npm run generate

FROM php:8.1-fpm

# Set Environment Variables
ENV DEBIAN_FRONTEND noninteractive

#
#--------------------------------------------------------------------------
# Software's Installation
#--------------------------------------------------------------------------
#
# Installing tools and PHP extentions using "apt", "docker-php", "pecl",
#

# Install "curl", "libmemcached-dev", "libpq-dev", "libjpeg-dev",
#         "libpng-dev", "libfreetype6-dev", "libssl-dev", "libmcrypt-dev",
RUN set -eux; \
    apt-get update; \
    apt-get upgrade -y; \
    apt-get install -y --no-install-recommends \
            curl \
            libmemcached-dev \
            libz-dev \
            libpq-dev \
            libjpeg-dev \
            libpng-dev \
            libfreetype6-dev \
            libssl-dev \
            libwebp-dev \
            libxpm-dev \
            libmcrypt-dev \
            libonig-dev; \
    rm -rf /var/lib/apt/lists/*

RUN set -eux; \
    # Install the PHP pdo_pgsql extention
    docker-php-ext-install pdo_pgsql; 
    
WORKDIR /app

COPY . .

COPY --from=frontend /app/frontend/.output/public /app/

# PHP extensions
# Example: RUN docker-php-ext-install pdo pdo_mysql

# Start your PHP application
CMD ["php", "-S", "0.0.0.0:8080"]
