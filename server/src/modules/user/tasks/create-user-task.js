const bcrypt = require('bcryptjs');
const Joi = require('joi');
const knex = require('../../../database/connection');
const getUser = require('./get-user-task');

module.exports = async (data) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(30).required(),
  });

  try {
    await Joi.validate(data, schema);
  } catch (err) {
    return {
      // TODO: only return relevant data to the client
      errors: err.details.map(d => d),
    };
  }

  const { email, password } = data;

  const user = await getUser({ email });

  if (user) {
    return {
      errors: [
        { email: 'This email already exists.' },
      ],
    };
  }


  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(password, salt);

  const res = await knex('users').insert({
    email: email.trim().toLowerCase(),
    password: hash,
  }).returning(['id', 'email']);

  return res[0];
};
