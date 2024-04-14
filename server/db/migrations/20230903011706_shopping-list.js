/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('shopping_list', (table) => {
    table.increments('id').primary()
    // table.integer('user_id').references('id').inTable('users')
    table.string('item')
    table.integer('quantity')
    table.dateTime('created_at').defaultTo(knex.fn.now())
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('shopping_list')
}
