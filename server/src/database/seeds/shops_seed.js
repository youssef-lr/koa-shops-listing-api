exports.seed = async (knex) => {
  await knex('shops').del();

  const names = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'];

  const shops = names.map(name => ({
    name,
  }));

  return knex('shops').insert(shops);
};
