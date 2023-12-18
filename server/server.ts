import * as Path from 'node:path'

import express from 'express'

import listRouter from './routes/shopping-list.ts'
import appointmentsRouter from './routes/appointments.ts'
import membersRouter from './routes/family-members.ts'
import checkJwt from './auth0.ts'

const server = express()
server.use(express.json())

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

// Adding auth0 check to all endpoints
// server.use(checkJwt)

// Different routes set up
server.use('/api/v1/list', listRouter)
server.use('/api/v1/appointments', appointmentsRouter)
server.use('/api/v1/members', membersRouter)

// Get /
// server.get('/', (req, res) => {
//   res.send('This is the landing page')
// })

export default server
