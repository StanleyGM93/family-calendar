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
})
