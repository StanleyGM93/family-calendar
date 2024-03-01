import { it, describe, expect, vi } from 'vitest'
import request from 'supertest'
import server from '../../server.ts'
import * as db from '../../db/appointments-db.ts'

vi.mock('../../db/appointments-db.ts')
