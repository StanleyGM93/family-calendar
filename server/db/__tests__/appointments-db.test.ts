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
  it('returns an array of appointments', async () => {
    const appointments = await db.getAllAppointments()

    expect(Array.isArray(appointments)).toBe(true)
    expect(appointments).toHaveLength(3)
    expect(typeof appointments[0] === 'object').toBe(true)
  })
})

describe('getAppointmentById', () => {
  it('returns a single appointment within an array', async () => {
    const appointment = await db.getAppointmenById(1)

    expect(Array.isArray(appointment)).toBe(true)
    expect(appointment).toHaveLength(1)
    expect(appointment[0].purpose).toEqual('christmas')
  })
})

//After all tests close the connection
afterAll(async () => {
  await connection.destroy()
})
