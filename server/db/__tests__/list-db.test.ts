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

describe('getListItemById', () => {
  it('returns an array with a single list item', async () => {
    const listItem = await db.getListItemById(2)

    expect(Array.isArray(listItem)).toBe(true)
    expect(listItem).toHaveLength(1)
    expect(listItem[0].id).toEqual(2)
  })
})

describe('updateListItemById', () => {
  it('updates a list item based on its id', async () => {
    const idToTest = 1
    const fakeInfo = {
      id: 1,
      item: 'updated item',
      quantity: 100,
    }
    await db.updateListItemById(idToTest, fakeInfo)

    const updatedListItem = await db.getListItemById(idToTest)
    expect(updatedListItem[0].userId).toEqual(1)
    expect(updatedListItem[0].item).toBe('updated item')
  })
})

//After all tests close the connection
afterAll(async () => {
  await connection.destroy()
})
