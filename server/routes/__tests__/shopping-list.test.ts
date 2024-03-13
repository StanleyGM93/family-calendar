import { it, describe, expect, vi, beforeEach } from 'vitest'
import request from 'supertest'
import server from '../../server.ts'
import * as db from '../../db/list-db.ts'

vi.mock('../../db/list-db.ts')

beforeEach(async () => {
  vi.resetAllMocks()
})

describe('GET /api/v1/list', () => {
  it('should return all list items', async () => {
    const mockListItems = [
      {
        id: 1,
        userId: 1,
        item: 'bananas',
        quantity: 3,
        createdAt: new Date('2023/12/08T06:00:00'),
      },
      {
        id: 2,
        userId: 1,
        item: 'apples',
        quantity: 6,
        createdAt: new Date('2023/12/08T06:00:00'),
      },
    ]

    it('should return all list items successfully', async () => {
      vi.mocked(db.getAllListItems).mockResolvedValue(mockListItems)

      const response = await request(server).get('/api/v1/list/')

      expect(response.status).toBe(200)
      expect(response.body).toHaveLength(mockListItems.length)
    })
  })
})
