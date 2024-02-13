import { it, describe, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import connection from '../connection.ts'
import * as db from '../appointments-db.ts'

//Before all tests run migrations
beforeAll(() => {
  return connection.migrate.latest()
})

//Before each test run seeds
beforeEach(async () => {
  await connection.seed.run()
})

describe('getAllAppointments', () => {
  it('should return an array of appointments', async () => {
    const appointments = await db.getAllAppointments()

    expect(Array.isArray(appointments)).toBe(true)
    expect(appointments).toHaveLength(3)
    expect(typeof appointments[0] === 'object').toBe(true)
  })
})

//After all tests close the connection
afterAll(async () => {
  await connection.destroy()
})
