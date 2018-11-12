const jwt = require('jsonwebtoken');
const createUser = require('../../user/tasks/create-user-task');

module.exports = async (ctx) => {
  const data = ctx.request.body;
  const result = await createUser(data);

  if (result.errors) {
    ctx.status = 422;
    ctx.body = {
      errors: result.errors,
    };
    return;
  }

  const token = jwt.sign({
    id: result.id,
  }, 'secret');

  ctx.body = {
    user: result,
    token,
  };
};
