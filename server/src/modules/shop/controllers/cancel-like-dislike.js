const cancelLikeDislike = require('../tasks/cancel-like-dislike');

module.exports = async (ctx) => {
  const userId = ctx.state.user.id;
  const data = ctx.request.body;

  const res = await cancelLikeDislike(userId, data.shopId);

  if (res.errors) {
    ctx.status = 422;
    ctx.body = {
      errors: res.errors,
    };
    return;
  }

  ctx.body = {
    success: true,
    item: res,
  };
};
