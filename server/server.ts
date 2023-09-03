import * as Path from 'node:path'

import express from 'express'

import listRouter from './routes/shopping-list.ts'
import appointmentsRouter from './routes/appointments.ts'
import membersRouter from './routes/family-members.ts'

const server = express()
server.use(express.json())

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

// Different routes set up
server.use('/list', listRouter)
server.use('/appointments', appointmentsRouter)
server.use('/members', membersRouter)

// Get /
server.get('/', (req, res) => {
  res.send('This is the landing page')
})

export default server
