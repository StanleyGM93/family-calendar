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

describe('updateAppointment', () => {
  it('updates an appointment', async () => {
    const fakeInfo = {
      id: 1,
      data: {
        memberId: 1,
        dateTime: 'updated date_time',
        location: 'updated location',
        purpose: 'updated purpose',
      },
    }
    await db.updateAppointment(fakeInfo)

    const updatedAppointment = await db.getAppointmenById(1)
    expect(updatedAppointment[0].location).toBe('updated location')
    expect(updatedAppointment).toMatchInlineSnapshot(`
      [
        {
          "dateTime": "updated date_time",
          "id": 1,
          "location": "updated location",
          "memberId": 1,
          "purpose": "updated purpose",
        },
      ]
    `)
  })
})

describe('addAppointment', () => {
  it('adds a new appointment', async () => {
    const newAppointment = {
      memberId: 2,
      dateTime: 'new date_time',
      location: 'new location',
      purpose: 'new purpose',
    }
    const addedAppointment = await db.addAppointment(newAppointment)

    expect(Array.isArray(addedAppointment)).toBe(true)
    expect(addedAppointment).toMatchInlineSnapshot(`
      [
        {
          "date_time": "new date_time",
          "id": 4,
          "location": "new location",
          "member_id": 2,
          "purpose": "new purpose",
        },
      ]
    `)
  })
})

//After all tests close the connection
afterAll(async () => {
  await connection.destroy()
})
