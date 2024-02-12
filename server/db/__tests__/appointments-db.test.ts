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

//After all tests close the connection
afterAll(async () => {
  await connection.destroy()
})
