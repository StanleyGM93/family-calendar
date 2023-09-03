/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('shopping_list').insert([
    {
      id: 1,
      user_id: 1,
      item: 'bananas',
      quantity: 3,
      created_at: '2023/12/08T06:00:00',
    },
    {
      id: 2,
      user_id: 1,
      item: 'apples',
      quantity: 6,
      created_at: '2023/8/158T08:00:00',
    },
    {
      id: 3,
      user_id: 1,
      item: 'pavlova',
      quantity: 2,
      created_at: '2023/12/25T19:00:00',
    },
  ])
}
