/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('users').insert([
    {
      id: 1,
      name: 'Bob',
      username: 'Bobbuildier',
      password: '123',
      email: 'bob@bob.com',
    },
  ])
}
