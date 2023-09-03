/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('appointments').insert([
    {
      id: 1,
      member_id: 1,
      date_time: '2023/12/25T18:00:00',
      location: 'family home',
      purpose: 'christmas',
    },
    {
      id: 2,
      member_id: 2,
      date_time: '2023/11/11T09:00:00',
      location: 'doctor',
      purpose: 'check up',
    },
    {
      id: 3,
      member_id: 3,
      date_time: '2023/10/31T18:00:00',
      location: 'neighbourhood',
      purpose: 'halloween',
    },
  ])
}
