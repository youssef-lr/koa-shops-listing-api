exports.up = knex => knex.schema.createTable('users', (table) => {
  table.increments();
  table.timestamps(true, true);
  table.string('email').notNullable().unique();
  table.string('password').notNullable();
});

exports.down = knex => knex.schema.dropTable('users');
