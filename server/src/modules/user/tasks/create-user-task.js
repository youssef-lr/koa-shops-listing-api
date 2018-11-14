const bcrypt = require('bcryptjs');
const Joi = require('joi');
const knex = require('../../../database/connection');
const getUser = require('./get-user-task');

module.exports = async (data) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(30).required(),
    confirm: Joi.required(),
  });
  const errors = {};

  try {
    await Joi.validate(data, schema);
  } catch (err) {
    err.details.forEach((e) => {
      errors[e.context.key] = e.message;
    });

    return { errors };
  }

  const { email, password, confirm } = data;

  const user = await getUser({ email });

  if (user) {
    errors.email = 'This email already exists.';
  }
  if (confirm !== password) {
    errors.confirm = 'Passwords do not match';
  }

  if (Object.keys(errors).length) {
    return { errors };
  }


  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(password, salt);

  const res = await knex('users').insert({
    email: email.trim().toLowerCase(),
    password: hash,
  }).returning(['id', 'email']);

  return res[0];
};
