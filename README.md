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

If you want to run the backend in host machine mode, you must run `composer install` and configure the database in `backend/src/Services/Db.php`
If needed, configure the `cors.php` file in `backend/src/cors.php`

## Frontend
Frontend was built on node 18.
To install, go to frontend folder and use `npm ci`. Then you can `npm run dev`. If you prefer, there is a build on `frontend_build.zip` file.

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


