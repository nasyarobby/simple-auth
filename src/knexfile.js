// Update with your config settings.

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST_DEV || 'db',
      database: process.env.DB_NAME_DEV || 'taxval',
      user: process.env.DB_USER_DEV || 'taxval',
      password: process.env.DB_PASSWORD_DEV || 'taxval',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'auth_knex_migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST_PROD || 'db',
      database: process.env.DB_NAME_PROD || 'taxval',
      user: process.env.DB_USER_PROD || 'taxval',
      password: process.env.DB_PASSWORD_PROD || 'taxval',
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
