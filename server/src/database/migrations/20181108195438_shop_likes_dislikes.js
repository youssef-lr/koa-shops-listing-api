exports.up = knex => knex.schema.createTable('shops_likes', (table) => {
  table.increments();
  table.timestamps(true, true);
  table.integer('user_id').unsigned();
  table.integer('shop_id').unsigned();
  table.enum('like_status', ['liked', 'disliked']);
  table.timestamp('disliked_at');

  table.foreign('user_id').references('id').inTable('users');
  table.foreign('shop_id').references('id').inTable('shops');
});

exports.down = knex => knex.schema.dropTable('shops_likes');
