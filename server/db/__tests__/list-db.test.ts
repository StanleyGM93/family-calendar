import { it, describe, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import connection from '../connection.ts'
import * as db from '../list-db.ts'

//Before all tests run migrations
beforeAll(() => {
  return connection.migrate.latest()
})

//Before each test run seeds
beforeEach(async () => {
  await connection.seed.run()
})

describe('getAllListItems', () => {
  it('returns an array of all list items', async () => {
    const allListItems = await db.getAllListItems()

    expect(Array.isArray(allListItems)).toBe(true)
    expect(allListItems).toHaveLength(3)
  })
})
//After all tests close the connection
afterAll(async () => {
  await connection.destroy()
})
