/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  // Drop existing foreign key
  await knex.raw('PRAGMA foreign_keys=off;')
  await knex.schema.alterTable('appointments', (table) => {
    table.dropForeign(['member_id'])
  })
  await knex.raw('PRAGMA foreign_keys=on;')

  // Recreate foreign key with the desired option
  return knex.schema.alterTable('appointments', (table) => {
    table.foreign('member_id').references('member_id').onDelete('CASCADE')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  // Drop the foreign key
  return knex.schema.alterTable('appointments', (table) => {
    table.dropForeign(['member_id'])
  })
}
