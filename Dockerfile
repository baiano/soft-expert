FROM node:18 as frontend

WORKDIR /app/frontend

COPY frontend/package*.json .

COPY ./frontend .

RUN npm ci

RUN npm run generate


# Start the app
# CMD ["npm", "run", "dev"]

FROM php:7.4

WORKDIR /app

COPY . .

COPY --from=frontend /app/frontend/.output/public /app/

# PHP extensions
# Example: RUN docker-php-ext-install pdo pdo_mysql

# Start your PHP application
CMD ["php", "-S", "0.0.0.0:8080"]
