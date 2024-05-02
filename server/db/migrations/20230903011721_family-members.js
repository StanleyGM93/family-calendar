/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('family_members', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.string('relationship').notNullable()
    table.date('date_of_birth').nullable()
    table
      .integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('family_members')
}
