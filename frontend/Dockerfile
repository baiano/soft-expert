FROM node:18 as frontend

WORKDIR /app/

COPY package*.json ./

RUN npm ci

COPY .env ./

# RUN npm run generate

# COPY . .

# Start the app
# CMD ["npm", "run", "dev"]
