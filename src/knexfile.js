// Update with your config settings.

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: 'db',
      database: 'taxval',
      user: 'taxval',
      password: 'taxval',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
