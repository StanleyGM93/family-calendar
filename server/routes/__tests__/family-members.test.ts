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
  it('should handle errors properly', async () => {
    vi.mocked(db.getAllFamilyMembers).mockRejectedValue(
      new Error('Database error')
    )

    const response = await request(server).get('/api/v1/members/')

    expect(response.status).toBe(500)
    expect(response.text).toBe('Database error')
  })
})

describe('GET /api/v1/members/:id', () => {
  it('returns a single member based on id', async () => {
    const mockFamilyMember = [
      {
        id: 2,
        userId: 1,
        name: 'Gobbler',
        relationship: 'sister',
        dateOfBirth: '1960 / 12 / 7',
      },
    ]

    vi.mocked(db.getFamilyMemberById).mockResolvedValue(mockFamilyMember)

    const response = await request(server).get('/api/v1/members/2')

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveLength(1)
  })

  it('should handle errors properly', async () => {
    vi.mocked(db.getFamilyMemberById).mockRejectedValue(
      new Error('Database error')
    )

    const response = await request(server).get('/api/v1/members/2')

    expect(response.status).toBe(500)
    expect(response.text).toBe('Database error')
  })
})

describe('PATCH /api/v1/members/', () => {
  it('returns a status code of 200 if successful', async () => {
    vi.mocked(db.updateFamilyMemberById).mockResolvedValue(1)

    const response = await request(server).patch('/api/v1/members')

    expect(response.statusCode).toBe(200)
  })

  it('should handle errors properly', async () => {
    vi.mocked(db.updateFamilyMemberById).mockRejectedValue(
      new Error('Database error')
    )

    const response = await request(server).patch('/api/v1/members')

    expect(response.status).toBe(500)
    expect(response.text).toBe('Database error')
  })
})

describe('POST /api/v1/members/', () => {
  it('returns a status code of 201 if succesful', async () => {
    vi.mocked(db.addFamilyMember).mockResolvedValue([1])

    const response = await request(server).post('/api/v1/members')

    expect(response.statusCode).toBe(201)
  })

  it('should handle errors properly', async () => {
    vi.mocked(db.addFamilyMember).mockRejectedValue(new Error('Database error'))

    const response = await request(server).post('/api/v1/members')

    expect(response.status).toBe(500)
    expect(response.text).toBe('Database error')
  })
})

describe('DELETE /api/v1/members/:id', () => {
  it('deletes a list item', async () => {
    vi.mocked(db.deleteFamilyMember).mockResolvedValue(1)

    const response = await request(server).delete('/api/v1/members/3')

    expect(response.statusCode).toBe(204)
  })

  it('should handle errors properly', async () => {
    vi.mocked(db.deleteFamilyMember).mockRejectedValue(
      new Error('Database error')
    )

    const response = await request(server).delete('/api/v1/members/3')

    expect(response.status).toBe(500)
    expect(response.text).toBe('Database error')
  })
})
