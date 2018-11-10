const knex = require('../../../database/connection');

module.exports = async (userId) => {
  const shops = await knex('shops')
    .join('favorite_shops', 'shops.id', '=', 'favorite_shops.user_id')
    .select('shops.*');

  return shops;
};
