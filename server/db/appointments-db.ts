import db from './connection'
import {
  Appointment,
  AppointmentUpdate,
  NewAppointment,
} from '../../models/appointments'

// appointments

// Other useful functions
// Get all appointments by family member id
// Get all appointments by dateTime

export function getAllAppointments(): Promise<Appointment[]> {
  return db('appointments').select(
    'id',
    'member_id as memberId',
    'date_time as dateTime',
    'location',
    'purpose'
  )
}

export function getAppointmenById(id: number) {
  return db('appointments')
    .select(
      'id',
      'member_id as memberId',
      'date_time as dateTime',
      'location',
      'purpose'
    )
    .where('id', id)
}

export function updateAppointment(id: number, updatedInfo: AppointmentUpdate) {
  return db('appointments').update(updatedInfo).where('id', id)
}

export function addAppointment(newAppointmentInfo: NewAppointment) {
  const { memberId, dateTime, location, purpose } = newAppointmentInfo
  const infoToAdd = {
    member_id: memberId,
    date_time: dateTime,
    location,
    purpose,
  }
  return db('appointments').insert(infoToAdd).returning('*')
}

export function deleteAppointment(id: number) {
  return db('appointments').delete().where('id', id)
}
