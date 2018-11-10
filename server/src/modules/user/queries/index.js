const bcrypt = require('bcryptjs');
const knex = require('../../../database/connection');

function isEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function getUser(params) {
  return knex('users').select('*').where(params);
}

/**
 * Lightweight validation, I could've used a validator package but that would be overkill
 * for a simple project
 */
function validate(email, password) {
  let errors = null;

  const addError = (key, message) => {
    if (!errors) {
      errors = {};
    }
    if (!errors[key]) {
      errors[key] = [];
    }
    errors[key].push(message);
  };
  if (password.length < 6) {
    addError('password', 'Password length cannot be less than 6 characters');
  }
  if (!isEmail(email)) {
    addError('email', 'Invalid email');
    return errors;
  }

  const user = getUser({ email });
  if (user) {
    addError('email', 'This email already exists.');
  }

  return errors;
}

async function createUser({ email, password }) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(password, salt);

  const errors = validate(email, password);

  if (errors) {
    return {
      hasErrors: true,
      errors,
    };
  }

  return knex('users').insert({
    email,
    password: hash,
  }).returning(['id', 'email']);
}

module.exports = {
  getUser,
  createUser,
};
