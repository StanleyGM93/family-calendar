import { useQuery } from '@tanstack/react-query'

import { getAllAppointments } from '../apis/appointments.ts'
import { Appointment as AppointmentType } from '../../models/appointments.ts'
import Appointment from './Appointment.tsx'

function Appointments() {
  const {
    data: appointments,
    isError,
    error,
    isLoading,
  } = useQuery<AppointmentType[], Error>(['appointments'], getAllAppointments)

  if (isError) {
    return <div>There was an error: {error?.message}</div>
  }

  if (isLoading) {
    return <div>Loading your shopping list</div>
  }

  if (!appointments) {
    return <div>Could not retrieve appointments</div>
  }

  const listItemsToRender = appointments.map((appointment) => (
    <Appointment appointment={appointment} key={appointment.id} />
  ))

  return (
    <section>
      <h2>Appointments</h2>
      <ul>{listItemsToRender}</ul>
    </section>
  )
}

export default Appointments
