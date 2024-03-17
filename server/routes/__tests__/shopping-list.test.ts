import { it, describe, expect, vi, beforeEach } from 'vitest'
import request from 'supertest'
import server from '../../server.ts'
import * as db from '../../db/list-db.ts'

vi.mock('../../db/list-db.ts')

beforeEach(async () => {
  vi.resetAllMocks()
})

describe('GET /api/v1/list', () => {
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

  it('should handle errors properly', async () => {
    vi.mocked(db.getAllListItems).mockRejectedValue(new Error('Database error'))

    const response = await request(server).get('/api/v1/list/')

    expect(response.status).toBe(500)
    expect(response.text).toBe('Database error')
  })
})

describe('GET /api/v1/list/:itemId', () => {
  it('returns a single list item', async () => {
    const mockListItem = [
      {
        id: 1,
        userId: 1,
        item: 'bananas',
        quantity: 3,
        createdAt: new Date('2023/12/08T06:00:00'),
      },
    ]

    vi.mocked(db.getListItemById).mockResolvedValue(mockListItem)

    const response = await request(server).get('/api/v1/list/1')

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveLength(1)
  })

  it('should handle errors properly', async () => {
    vi.mocked(db.getListItemById).mockRejectedValue(new Error('Database error'))

    const response = await request(server).get('/api/v1/list/2')

    expect(response.status).toBe(500)
    expect(response.text).toBe('Database error')
  })
})

describe('PATCH /api/v1/list/:itemId', () => {
  it('returns a status code of 200 if successful', async () => {
    vi.mocked(db.updateListItemById).mockResolvedValue([1])

    const response = await request(server).patch('/api/v1/list/2')

    expect(response.statusCode).toBe(200)
  })
})
