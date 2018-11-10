const knex = require('../../../database/connection');

module.exports = async function getUser(params) {
  const result = await knex('users').where(params).select('*');

  if (!result.length) {
    return null;
  }

  return result[0];
};
