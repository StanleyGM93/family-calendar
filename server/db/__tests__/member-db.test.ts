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

describe('updateFamilyMemberById', () => {
  it('updates a family member and returns the updated info', async () => {
    const fakeUpdate = {
      id: 1,
      data: {
        name: 'updated name',
        relationship: 'updated relationship',
      },
    }

    await db.updateFamilyMemberById(fakeUpdate)

    const updatedFamilyMember = await db.getFamilyMemberById(1)
    console.log(updatedFamilyMember)
    expect(Array.isArray(updatedFamilyMember)).toBe(true)
    expect(updatedFamilyMember).toHaveLength(1)
    expect(updatedFamilyMember[0].name).toEqual('updated name')
  })
})

describe('addFamilyMember', () => {
  it('adds a family member', async () => {
    const newFamilyMember = {
      userId: 1,
      name: 'new family member',
      relationship: 'new relationship',
      dateOfBirth: 'new dob',
    }
    await db.addFamilyMember(newFamilyMember)

    const addedFamilyMember = await db.getFamilyMemberById(4)

    expect(addedFamilyMember[0].name).toBe('new family member')
  })
})

describe('deleteFamilyMember', () => {
  it('deletes a family member', async () => {
    const memberToDelete = await db.deleteFamilyMember(3)

    expect(memberToDelete).toThrowError()
  })
})

//After all tests close the connection
afterAll(async () => {
  await connection.destroy()
})
