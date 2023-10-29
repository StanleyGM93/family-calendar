import { useQuery } from '@tanstack/react-query'

import { getAllAppointments } from '../apis/appointments.ts'
import { Appointment as AppointmentType } from '../../models/appointments.ts'
import Appointment from './Appointment.tsx'
import { Box, Heading, UnorderedList, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

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
    <Box>
      <Heading as="h2">Appointments</Heading>
      <UnorderedList>{listItemsToRender}</UnorderedList>
      <Link to={'new'}>
        <Button>Add appointment</Button>
      </Link>
    </Box>
  )
}

export default Appointments
