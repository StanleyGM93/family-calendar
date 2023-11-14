import { useQuery } from '@tanstack/react-query'

import { AddIcon } from '@chakra-ui/icons'
import { Box, Button, Center, SimpleGrid } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { Appointment as AppointmentType } from '../../models/appointments.ts'
import { getAllAppointments } from '../apis/appointments.ts'
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
    <Box px={10}>
      <Center as="h2" fontSize={'4xl'} fontWeight={'bold'}>
        Appointments
      </Center>
      <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} spacing={5} my={5}>
        {listItemsToRender}
      </SimpleGrid>
      <Center>
        <Link to={'/appointments/new'}>
          <Button p={6}>
            <AddIcon boxSize={6} />
          </Button>
        </Link>
      </Center>
    </Box>
  )
}

export default Appointments
