# SoftExpert

How to install:

```
git clone https://github.com/baiano/soft-expert.git
cd soft-expert
docker compose up -d --build
```

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
To install, use `npm ci` and run with `npm run dev`.

## Database
The database is Postgres and is configured in `docker-compose.yml` and `db/Dockerfile` files.
The seed is located in `db/seed/seed.sql`and is automatically imported when docker is built

## Tests
There are frontend tests, covering basic operations as CRUD. To run, you will need to install the dependencies with `npm ci` and run `npx vitest` in the frontend folder (Host Machine). Check your node version, it must be 18 or higher.

## Contact
If you have any questions, please contact me at `guilhermelchaves@gmail.com` or leave a message in [my personal site](https://limachaves.com).


