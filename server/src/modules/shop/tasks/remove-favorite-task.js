const knex = require('../../../database/connection');

module.exports = async (userId, shopId) => {
  const params = {
    user_id: userId,
    shop_id: shopId,
  };

  return knex('shops_likes')
    .where(params)
    .delete();
};
