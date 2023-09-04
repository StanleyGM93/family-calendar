import request from 'superagent'
import { AppointmentUpdate, NewAppointment } from '../../models/appointments'

export async function getAllAppointments() {
  const response = await request.get('/appointments')
  return response.body
}

export async function getAppointmentById(id: number) {
  const response = await request.get(`/appointments/${id}`)
  return response.body
}

export async function addAppointment(newAppointment: NewAppointment) {
  const response = await request.post('/appointments').send(newAppointment)
  return response.statusCode
}

export async function updateAppointment(
  id: number,
  updatedAppointment: AppointmentUpdate
) {
  const response = await request
    .patch(`/appointments/${id}`)
    .send(updatedAppointment)
  return response.statusCode
}

export async function deleteAppointment(id: number) {
  const response = await request.delete(`/appointments/${id}`)
  return response.statusCode
}
