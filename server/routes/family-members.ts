import express from 'express'
import * as memberDb from '../db/members-db.ts'
import checkJwt from '../auth0.ts'

const router = express.Router()

// GET /members
router.get('/', async (req, res) => {
  try {
    const allFamilyMembers = await memberDb.getAllFamilyMembers()
    res.json(allFamilyMembers)
  } catch (e) {
    console.error(e)
    if (e instanceof Error) {
      res.status(500).send(e.message)
    } else {
      res.status(500).send('An unexpected error occurred')
    }
  }
})

// Get /members/:id
router.get('/:id', async (req, res) => {
  const memberId = Number(req.params.id)
  try {
    const familyMember = await memberDb.getFamilyMemberById(memberId)
    res.json(familyMember)
  } catch (e) {
    console.error(e)
    if (e instanceof Error) {
      res.status(500).send(e.message)
    } else {
      res.status(500).send('An unexpected error occurred')
    }
  }
})

// Patch /members/:id
router.patch('/:id', checkJwt, async (req, res) => {
  const memberId = Number(req.params.id)
  const updatedFamilyMember = req.body
  try {
    await memberDb.updateFamilyMemberById(memberId, updatedFamilyMember)
    res.sendStatus(200)
  } catch (e) {
    console.error(e)
    if (e instanceof Error) {
      res.status(500).send(e.message)
    } else {
      res.status(500).send('An unexpected error occurred')
    }
  }
})

// Post /members/
router.post('/:userEmail', checkJwt, async (req, res) => {
  const userEmail = req.params.userEmail
  console.log(userEmail)
  const familyMemberToAdd = req.body
  try {
    await memberDb.addFamilyMember(familyMemberToAdd)
    res.sendStatus(201)
  } catch (e) {
    console.error(e)
    if (e instanceof Error) {
      res.status(500).send(e.message)
    } else {
      res.status(500).send('An unexpected error occurred')
    }
  }
})

// Delete /members/:id
router.delete('/:id', async (req, res) => {
  const memberId = Number(req.params.id)
  try {
    await memberDb.deleteFamilyMember(memberId)
    res.sendStatus(204)
  } catch (e) {
    console.error(e)
    if (e instanceof Error) {
      res.status(500).send(e.message)
    } else {
      res.status(500).send('An unexpected error occurred')
    }
  }
})

export default router
