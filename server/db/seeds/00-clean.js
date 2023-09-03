/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('shopping_list').del()
  await knex('appointments').del()
  await knex('family_members').del()
  await knex('users').del()
}
