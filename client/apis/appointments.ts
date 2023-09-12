import request from 'superagent'
import { AppointmentUpdate, NewAppointment } from '../../models/appointments'

export async function getAllAppointments() {
  const response = await request.get('/api/v1/appointments')
  return response.body
}

export async function getAppointmentById(id: number) {
  const response = await request.get(`/api/v1/appointments/${id}`)
  return response.body
}

export async function addAppointment(newAppointment: NewAppointment) {
  const response = await request
    .post('/api/v1/appointments')
    .send(newAppointment)
  return response.statusCode
}

export async function updateAppointment(
  id: number,
  updatedAppointment: AppointmentUpdate
) {
  const response = await request
    .patch(`/api/v1/appointments/${id}`)
    .send(updatedAppointment)
  return response.statusCode
}

export async function deleteAppointment(id: number) {
  const response = await request.delete(`/api/v1/appointments/${id}`)
  return response.statusCode
}
