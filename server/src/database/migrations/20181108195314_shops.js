exports.up = knex => knex.schema.createTable('shops', (table) => {
  table.increments();
  table.timestamps(true, true);
  table.string('name').notNullable().unique();
  table.string('image');
  table.float('latitude');
  table.float('longitude');
});

exports.down = knex => knex.schema.dropTable('shops');
