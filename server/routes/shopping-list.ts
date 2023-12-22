import express from 'express'
import * as listDb from '../db/list-db.ts'
import checkJwt from '../auth0.ts'

const router = express.Router()

// GET /list
router.get('/', async (req, res) => {
  try {
    const allListItems = await listDb.getAllListItems()
    res.json(allListItems)
  } catch (e) {
    console.error(e)
    if (e instanceof Error) {
      res.status(500).send(e.message)
    } else {
      res.status(500).send('An unexpected error occurred')
    }
  }
})

// Get /list/:itemId
router.get('/:itemId', async (req, res) => {
  const itemId = Number(req.params.itemId)
  try {
    const listItem = await listDb.getListItemById(itemId)
    res.json(listItem)
  } catch (e) {
    console.error(e)
    if (e instanceof Error) {
      res.status(500).send(e.message)
    } else {
      res.status(500).send('An unexpected error occurred')
    }
  }
})

// Patch /list/:itemId
router.patch('/:itemId', checkJwt, async (req, res) => {
  const itemId = Number(req.params.itemId)
  const updatedItem = req.body
  try {
    await listDb.updateListItemById(itemId, updatedItem)
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

// Post /list/item
router.post('/item/:userEmail', checkJwt, async (req, res) => {
  const userEmail = req.params.userEmail
  console.log(userEmail)
  const itemToAdd = req.body
  try {
    await listDb.addListItem(itemToAdd)
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

// Delete /list/:itemId
router.delete('/:itemId', async (req, res) => {
  const itemId = Number(req.params.itemId)
  try {
    await listDb.deleteListItem(itemId)
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
