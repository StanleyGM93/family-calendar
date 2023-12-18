import express from 'express'
import * as appointmentsDb from '../db/appointments-db.ts'
import checkJwt, { JwtRequest } from '../auth0.ts'

const router = express.Router()

// GET /appointments
router.get('/', checkJwt, async (req: JwtRequest, res) => {
  const auth0Id = req.auth?.sub
  console.log(auth0Id)
  try {
    const allAppointments = await appointmentsDb.getAllAppointments()
    res.json(allAppointments)
  } catch (e) {
    console.error(e)
    if (e instanceof Error) {
      res.status(500).send(e.message)
    } else {
      res.status(500).send('An unexpected error occurred')
    }
  }
})

// Get /appointments/:id
router.get('/:id', async (req, res) => {
  const appointmentId = Number(req.params.id)
  try {
    const appointment = await appointmentsDb.getAppointmenById(appointmentId)
    res.json(appointment)
  } catch (e) {
    console.error(e)
    if (e instanceof Error) {
      res.status(500).send(e.message)
    } else {
      res.status(500).send('An unexpected error occurred')
    }
  }
})

// Patch /appointments/
router.patch('/', async (req, res) => {
  const updatedAppointment = req.body
  try {
    await appointmentsDb.updateAppointment(updatedAppointment)
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

// Post /appointments/
router.post('/', async (req, res) => {
  const newAppointment = req.body
  try {
    const returnAppt = await appointmentsDb.addAppointment(newAppointment)
    res.send(returnAppt).status(201)
  } catch (e) {
    console.error(e)
    if (e instanceof Error) {
      res.status(500).send(e.message)
    } else {
      res.status(500).send('An unexpected error occurred')
    }
  }
})

// Delete /appointments/:id
router.delete('/:id', async (req, res) => {
  const appointmentId = Number(req.params.id)
  try {
    await appointmentsDb.deleteAppointment(appointmentId)
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
