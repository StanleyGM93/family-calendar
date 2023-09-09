import { useQuery } from '@tanstack/react-query'

import { getAllAppointments } from '../apis/appointments'
import { Appointment as AppointmentType } from '../../models/appointments'
import Appointment from './Appointment'

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
    return <div>Could not retrieve shopping list</div>
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
