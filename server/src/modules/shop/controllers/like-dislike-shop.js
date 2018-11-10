const likeDislike = require('../tasks/like-dislike-task');

module.exports = async (ctx) => {
  const userId = ctx.state.user.id;
  const data = ctx.request.body;

  const res = await likeDislike(userId, data.shopId, data.likeStatus);

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
