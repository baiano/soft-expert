FROM node:18 as frontend

WORKDIR /app/frontend

COPY frontend/package*.json ./

COPY ./frontend ./

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
            libonig-dev \
            libxml2-dev \
            zip \
            unzip \
            libzip-dev; \
    rm -rf /var/lib/apt/lists/* \
    && php -r "readfile('https://getcomposer.org/installer');" | php -- --install-dir=/usr/local/bin --filename=composer

RUN set -eux; \
    docker-php-ext-install pdo_pgsql \
    && docker-php-ext-install zip \ 
    && docker-php-ext-install mbstring \
    && docker-php-ext-install xml;


# Install Xdebug
RUN pecl install xdebug \
    && docker-php-ext-enable xdebug

# Configure Xdebug
RUN echo "xdebug.mode=debug" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.client_host=host.docker.internal" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.start_with_request=yes" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini

    
WORKDIR /app/api

COPY ./backend .

COPY ./backend/composer.* ./

COPY ./.env ./api/

RUN composer install

COPY --from=frontend /app/frontend/.output/public /app/

WORKDIR /app/
# PHP extensions
# Example: RUN docker-php-ext-install pdo pdo_mysql

# Start your PHP application
CMD ["php", "-S", "0.0.0.0:8080"]
