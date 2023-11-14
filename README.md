# SoftExpert

How to install:

```
git clone https://github.com/baiano/soft-expert.git
cd soft-expert
docker compose up -d --build
```

Then navigate to `http://localhost:8080` to see the app running.

It should work out of the box, but if you find any errors, check the permissions of the files and folders to match your docker user. If needed, you can run the containers as root, but it is not recommended. Check below for more information:

## Structure
    
```
├── backend
├── frontend
├── db
```

## Backend

If you want to run the backend in host machine mode, you must run `composer install`. By default, you can pass the var `APP_ENV=development` and the backend will look for a database on localhost, but you can configure the database options on `backend/src/Services/Db.php`. Then you can run `APP_ENV=development php -S localhost:8080` to start the backend.
If needed, configure the `cors.php` file in `backend/src/cors.php`

## Frontend
Frontend was built on node 18.
To install, go to frontend folder and use `npm ci`. Then you can `npm run dev`. If you prefer, there is a build on `frontend_build.zip` file. Just unzip and serve the static files. It is pre-built to use its own domain and port 8080 as backend. If you want to change it, you need to edit the `frontend/stores/config.ts` file, in the getter apiUrl, and generate a new build.

## Database
The database is Postgres and is configured in `docker-compose.yml` and `db/Dockerfile` files.
The seed is located in `db/seed/seed.sql`and is automatically imported when docker is built

## Tests
There are frontend tests, covering basic operations as CRUD. To run, you will need to install the dependencies with `npm ci` and run `npx vitest` in the frontend folder (Host Machine). Check your node version, it must be 18 or higher.
To run the php tests, you can `docker compose exec server php vendor/bin/phpunit /app` in the root folder.

## Technologies
### Backend
- PHP 8.1
- Node 18
- Active Records
- Php Simple Router
- PHP Unit
### Frontend
- Vue 3
- Pinia
- Nuxt 3
- Tailwind
- Nuxt UI
- Vitest
### Database
- Postgres 11.1
### Others
- Docker
- Firebase/auth

## Contact
If you have any questions, please contact me at `guilhermelchaves@gmail.com` or leave a message in [my personal site](https://limachaves.com).

### PS
In a real world application, .env would not be versioned.


