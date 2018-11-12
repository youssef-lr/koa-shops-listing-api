const path = require('path');

module.exports = {
  test: {
    client: 'pg',
    connection: 'postgres://localhost:5432/united_test',
    migrations: {
      directory: path.join(__dirname, 'migrations'),
    },
    seeds: {
      directory: path.join(__dirname, 'seeds'),
    },
  },
  development: {
    client: 'pg',
    connection: 'postgres://localhost:5432/united',
    migrations: {
      directory: path.join(__dirname, 'migrations'),
    },
    seeds: {
      directory: path.join(__dirname, 'seeds'),
    },
  },
  production: {
    client: 'pg',
    connection: {
      host: 'localhost',
      database: 'united',
      port: 5432,
      user: 'postgres',
      password: 'hunter2',
    },
    migrations: {
      directory: path.join(__dirname, 'migrations'),
    },
    seeds: {
      directory: path.join(__dirname, 'seeds'),
    },
  },
};
