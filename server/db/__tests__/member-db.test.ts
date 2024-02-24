import { it, describe, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import connection from '../connection.ts'
import * as db from '../members-db.ts'

//Before all tests run migrations
beforeAll(() => {
  return connection.migrate.latest()
})

//Before each test run seeds
beforeEach(async () => {
  await connection.seed.run()
})

describe('getAllFamilyMembers', () => {
  it('returns an array of family members', async () => {
    const familyMembers = await db.getAllFamilyMembers()

    expect(Array.isArray(familyMembers)).toBe(true)
    expect(familyMembers).toHaveLength(3)
  })
})

describe('getFamilyMemberById', () => {
  it('returns a single family member in an array', async () => {
    const secondMember = await db.getFamilyMemberById(2)

    expect(Array.isArray(secondMember)).toBe(true)
    expect(secondMember[0].id).toBe(2)
    expect(secondMember).toHaveLength(1)
  })
})

//After all tests close the connection
afterAll(async () => {
  await connection.destroy()
})
