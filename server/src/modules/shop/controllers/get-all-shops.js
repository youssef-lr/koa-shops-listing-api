const getAllShops = require('../tasks/get-all-shops-task');

module.exports = async (ctx) => {
  const { id } = ctx.state.user.data;
  const shops = await getAllShops(id);
  ctx.body = { shops };
};
