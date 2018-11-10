const knex = require('../../../database/connection');

module.exports = async (userId, shopId, likeStatus) => {
  /* eslint-disable-next-line */
  likeStatus = likeStatus.trim().toLowerCase();

  if (likeStatus !== 'liked' && likeStatus !== 'disliked') {
    return {
      errors: {
        like_status: 'Incorrect value for param \'like_status\'',
      },
    };
  }

  let dislikedAt = null;
  if (likeStatus === 'disliked') {
    dislikedAt = new Date();
  }

  const params = {
    user_id: userId,
    shop_id: shopId,
    disliked_at: dislikedAt,
  };

  const likeDislike = await knex('shops_likes')
    .select('id')
    .where(params);

  if (likeDislike.length) {
    return knex('shops_likes')
      .where(params)
      .update('like_status', likeStatus);
  }

  return knex('shops_likes').insert({
    ...params,
    like_status: likeStatus,
  }).returning('*');
};
