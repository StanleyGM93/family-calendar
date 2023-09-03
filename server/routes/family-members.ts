import express from 'express'

const router = express.Router()

// GET /members
router.get('/', (req, res) => {
  res.send('Returns the family members')
})

// Get /members/:id
router.get('/:id', (req, res) => {
  res.send('Returns info on family member')
})

// Patch /members/:id
router.patch('/:id', (req, res, next) => {
  res.send('Updates a family member')
})

// Post /members/
router.post('/', (req, res) => {
  res.send('Adds a new family member')
})

// Delete /members/:id
router.delete('/:id', (req, res) => {
  res.send('removes an family member')
})

export default router
