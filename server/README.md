## About

A simple shops listing API with jwt authentication built using the following stack:

* Koa.js 
* PostgreSQL
* Knex Query Builder

## Running the app

1. Clone this project
2. run `npm install`
3. Run a Postgres instance on default port `5432`
4. Create two databases `united` and `united_test`
5. Migrate - knex migrate:latest --env development (`npm i -g knex` if not installed)
6. Seed - knex seed:run --env development
7. Run tests `npm run test`