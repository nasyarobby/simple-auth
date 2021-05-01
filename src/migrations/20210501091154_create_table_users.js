exports.up = function up(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.unique(['username']);
    table.unique(['email']);
    table.index('deleted_at');
    table.string('username').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.string('name').nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at').nullable();
  });
};

exports.down = function down(knex) {
  return knex.schema.dropTable('users');
};
