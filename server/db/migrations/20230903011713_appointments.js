/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('appointments', (table) => {
    table.increments('id').primary()
    table
      .integer('member_id')
      .unsigned()
      .nullable()
      .references('id')
      .inTable('family_members')
      .onDelete('SET NULL')
    table.dateTime('date_time')
    table.string('location')
    table.string('purpose')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('appointments')
}
