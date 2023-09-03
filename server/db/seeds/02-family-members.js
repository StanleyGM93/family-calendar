/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('family_members').insert([
    {
      id: 1,
      user_id: 1,
      name: 'Daisy',
      relationship: 'brother',
      date_of_birth: '1952 / 1 / 10',
    },
    {
      id: 2,
      user_id: 1,
      name: 'Gobbler',
      relationship: 'sister',
      date_of_birth: '1960 / 12 / 7',
    },
    {
      id: 3,
      user_id: 1,
      name: 'Zeka',
      relationship: 'child',
      date_of_birth: '2000 / 10 / 10',
    },
  ])
}
