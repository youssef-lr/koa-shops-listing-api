const getFavorites = require('../tasks/get-favorites-task');

module.exports = async (ctx) => {
  const { id } = ctx.state.user;
  const favorites = await getFavorites(id);

  ctx.body = { favorites };
};
