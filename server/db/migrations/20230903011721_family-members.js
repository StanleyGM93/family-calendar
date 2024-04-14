/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('family_members', (table) => {
    table.increments('id').primary()
    // table.integer('user_id').references('id').inTable('users')
    table.string('name')
    table.string('relationship')
    table.date('date_of_birth').nullable()
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('family_members')
}
