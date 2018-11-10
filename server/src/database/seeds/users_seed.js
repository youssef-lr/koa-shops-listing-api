const bcrypt = require('bcryptjs');

exports.seed = async (knex) => {
  await knex('users').del();

  const salt = bcrypt.genSaltSync();
  const password = bcrypt.hashSync('hunter2', salt);

  return knex('users').insert({
    email: 'user@gmail.com',
    password,
  });
};
