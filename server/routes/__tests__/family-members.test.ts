import { it, describe, expect, vi, beforeEach } from 'vitest'
import request from 'supertest'
import server from '../../server.ts'
import * as db from '../../db/members-db.ts'

vi.mock('../../db/members-db.ts')

beforeEach(async () => {
  vi.resetAllMocks()
})

describe('GET /api/v1/members', () => {
  it('returns all family members', async () => {
    const mockFamilyMembers = [
      {
        id: 1,
        userId: 1,
        name: 'Daisy',
        relationship: 'brother',
        dateOfBirth: '1952 / 1 / 10',
      },
      {
        id: 2,
        userId: 1,
        name: 'Gobbler',
        relationship: 'sister',
        dateOfBirth: '1960 / 12 / 7',
      },
    ]

    vi.mocked(db.getAllFamilyMembers).mockResolvedValue(mockFamilyMembers)

    const response = await request(server).get('/api/v1/members')

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveLength(mockFamilyMembers.length)
  })
})
