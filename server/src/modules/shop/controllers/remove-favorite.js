const removeFavorite = require('../tasks/remove-favorite-task');

module.exports = async (ctx) => {
  const userId = ctx.state.user.id;
  const data = ctx.request.body;

  const res = await removeFavorite(userId, data.shopId);

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
