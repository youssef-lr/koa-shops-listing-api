const knex = require('../../../database/connection');

module.exports = async (userId) => {
  /* eslint-disable-next-line */
  const shops = knex('shops').whereNotExists(function () {
    this.select('*').from('shops_likes')
      .whereRaw('shops_likes.shop_id = shops.id')
      .where({
        'shops_likes.user_id': userId,
        like_status: 'liked',
      })
      .orWhere(knex.raw(
        'shops_likes.shop_id = shops.id AND shops_likes.user_id = ? AND like_status = ? AND disliked_at > now() - \'2 HOUR\'::INTERVAL',
        [userId, 'disliked'],
      ));
  });

  return shops;
};
