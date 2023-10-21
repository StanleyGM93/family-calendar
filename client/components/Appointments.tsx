import { useQuery } from '@tanstack/react-query'

import { getAllAppointments } from '../apis/appointments.ts'
import { Appointment as AppointmentType } from '../../models/appointments.ts'
import Appointment from './Appointment.tsx'
import { List, Heading } from '@chakra-ui/react'

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
      <Heading as="h2">Appointments</Heading>
      <List>{listItemsToRender}</List>
    </section>
  )
}

export default Appointments
