exports.seed = async (knex) => {
  await knex('shops').del();

  const names = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

  const shops = names.map(name => ({
    name: `Shop ${name}`,
    image: `store${name}.jpg`,
  }));

  return knex('shops').insert(shops);
};
