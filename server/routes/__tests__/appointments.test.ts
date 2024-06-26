import { it, describe, expect, vi, beforeEach } from 'vitest'
import request from 'supertest'
import server from '../../server.ts'
import * as db from '../../db/appointments-db.ts'

vi.mock('../../db/appointments-db.ts')

beforeEach(async () => {
  vi.resetAllMocks()
})

describe('GET /api/v1/appointments/', () => {
  it('should return all appointments', async () => {
    vi.mocked(db.getAllAppointments).mockResolvedValue([
      {
        id: 1,
        memberId: 1,
        dateTime: 'fake date and time',
        location: 'fake location',
        purpose: 'fake purpose',
      },
      {
        id: 2,
        memberId: 2,
        dateTime: 'fake date and time user 2',
        location: 'fake location user 2',
        purpose: 'fake purpose user 2',
      },
    ])

    const response = await request(server).get('/api/v1/appointments')

    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(2)
  })

  it('should return 500 when an error occurs', async () => {
    vi.mocked(db.getAllAppointments).mockImplementation(() => {
      throw new Error('This throws an error')
    })

    const response = await request(server).get('/api/v1/appointments')

    expect(response.statusCode).toBe(500)
  })
})

describe('GET /api/v1/appointments/:id', () => {
  it('returns a single appointment', async () => {
    vi.mocked(db.getAppointmenById).mockResolvedValue([
      {
        id: 2,
        memberId: 2,
        dateTime: 'fake date and time user 2',
        location: 'fake location user 2',
        purpose: 'fake purpose user 2',
      },
    ])

    const response = await request(server).get('/api/v1/appointments/2')

    expect(response.statusCode).toBe(200)
    expect(db.getAppointmenById).toHaveBeenCalledWith(2)
    expect(Array.isArray(response.body)).toBe(true)
    expect(response.body[0].purpose).toEqual('fake purpose user 2')
  })

  it('should return 500 when an error occurs', async () => {
    vi.mocked(db.getAppointmenById).mockImplementation(() => {
      throw new Error('This throwns an error')
    })

    const response = await request(server).get('/api/v1/appointments/2')

    expect(response.statusCode).toBe(500)
  })
})

describe('PATCH /api/v1/appointments/', () => {
  it('returns a status of 200 for a successful patch', async () => {
    vi.mocked(db.updateAppointment).mockResolvedValue(1)

    const response = await request(server).patch('/api/v1/appointments/')

    expect(response.statusCode).toBe(200)
  })

  it('should return 500 when an error occurs', async () => {
    vi.mocked(db.updateAppointment).mockImplementation(() => {
      throw new Error('This throwns an error')
    })

    const response = await request(server).patch('/api/v1/appointments/')

    expect(response.statusCode).toBe(500)
  })
})

describe('POST /api/v1/appointments/', () => {
  it('Adds a new appointment', async () => {
    vi.mocked(db.addAppointment).mockResolvedValue([
      {
        date_time: 'new date_time',
        id: 4,
        location: 'new location',
        member_id: 2,
        purpose: 'new purpose',
      },
    ])

    const response = await request(server).post('/api/v1/appointments/')

    expect(response.statusCode).toBe(200)
    expect(response.body[0].location).toEqual('new location')
  })

  it('should return 500 when an error occurs', async () => {
    vi.mocked(db.addAppointment).mockImplementation(() => {
      throw new Error('This throwns an error')
    })

    const response = await request(server).post('/api/v1/appointments/')

    expect(response.statusCode).toBe(500)
  })
})

describe('DELETE /api/v1/appointments/:id', () => {
  it('deletes an appointment after given an id', async () => {
    vi.mocked(db.deleteAppointment).mockResolvedValue(1)

    const response = await request(server).delete('/api/v1/appointments/2')

    expect(response.statusCode).toBe(204)
  })

  it('should return 500 when an error occurs', async () => {
    vi.mocked(db.deleteAppointment).mockImplementation(() => {
      throw new Error('This throwns an error')
    })

    const response = await request(server).delete('/api/v1/appointments/1')

    expect(response.statusCode).toBe(500)
  })
})
