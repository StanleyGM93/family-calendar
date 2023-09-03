import express from 'express'

const router = express.Router()

// GET /appointments
router.get('/', (req, res) => {
  res.send('Returns the appointments')
})

// Get /appointments/:id
router.get('/:id', (req, res) => {
  res.send('Returns info on appointment')
})

// Patch /appointments/:id
router.patch('/:id', (req, res, next) => {
  res.send('Updates an appointment')
})

// Post /appointments/
router.post('/', (req, res) => {
  res.send('Adds a new appointment')
})

// Delete /appointments/:id
router.delete('/:id', (req, res) => {
  res.send('removes an appointment')
})

export default router
