const knex = require('../../../database/connection');

module.exports = async (userId) => {
  const shops = await knex('shops')
    .join('shops_likes', 'shops.id', '=', 'shops_likes.shop_id')
    .where('shops_likes.user_id', userId)
    .where('like_status', 'liked')
    .select('shops.*');

  return shops;
};
