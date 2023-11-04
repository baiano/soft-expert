
FROM node:18

WORKDIR /app

COPY package*.json .

RUN npm ci

RUN npm run generate

COPY . .

EXPOSE 3000

# Start the app
# CMD ["npm", "run", "dev"]
