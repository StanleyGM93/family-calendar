export interface NewAppointment {
  memberId: number
  dateTime: string
  location: string
  purpose: string
}

export interface Appointment extends NewAppointment {
  id: number
}

export interface AppointmentUpdate {
  memberId?: number
  dateTime?: string
  location?: string
  purpose?: string
}
