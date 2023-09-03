import express from 'express'
import * as db from '../db/db.ts'

const router = express.Router()

// GET /list
router.get('/', async (req, res, next) => {
  try {
    const allListItems = await db.getAllListItems()
    res.json(allListItems)
  } catch (e) {
    console.error(e)
    next(e)
  }
})

// Get /list/:itemId
router.get('/:itemId', async (req, res, next) => {
  const itemId = Number(req.params.itemId)
  try {
    const listItem = await db.getListItemById(itemId)
    res.json(listItem)
  } catch (e) {
    console.error(e)
    next(e)
  }
})

// Patch /list/:itemId
router.patch('/:itemId', async (req, res, next) => {
  const itemId = Number(req.params.itemId)
  const updatedItem = req.body
  try {
    await db.updateListItemById(itemId, updatedItem)
    res.sendStatus(200)
  } catch (e) {
    console.error(e)
    next(e)
  }
})

// Post /list/item
router.post('/item', async (req, res, next) => {
  const itemToAdd = req.body
  try {
    await db.addListItem(itemToAdd)
    res.sendStatus(201)
  } catch (e) {
    console.error(e)
    next(e)
  }
})

// Delete /list/:itemId
router.delete('/:itemId', async (req, res, next) => {
  const itemId = Number(req.params.itemId)
  try {
    await db.deleteListItem(itemId)
    res.sendStatus(200)
  } catch (e) {
    console.error(e)
    next(e)
  }
})

export default router
