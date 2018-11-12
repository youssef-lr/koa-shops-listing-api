const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const getUser = require('../../user/tasks/get-user-task');

module.exports = async (ctx) => {
  const data = ctx.request.body;

  if (!data.email || !data.password) {
    ctx.status = 400;
    ctx.body = {
      message: 'Please supply both an email and a password',
    };
    return;
  }

  const { email, password } = data;

  const user = await getUser({ email });

  if (!user) {
    ctx.status = 400;
    ctx.body = {
      message: 'No user found with the supplied email',
    };
    return;
  }

  const passwordValid = bcrypt.compareSync(password, user.password);

  if (!passwordValid) {
    ctx.status = 400;
    ctx.body = {
      message: 'Invalid password',
    };

    return;
  }

  const token = jwt.sign({
    id: user.id, email: user.email,
  }, 'secret');

  ctx.status = 200;
  ctx.body = {
    token,
  };
};
