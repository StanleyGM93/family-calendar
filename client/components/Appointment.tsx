import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Text,
} from '@chakra-ui/react'
import type { Appointment as AppointmentType } from '../../models/appointments'
import { deleteAppointment } from '../apis/appointments'

interface AppointmentProps {
  appointment: AppointmentType
}

function Appointment({ appointment }: AppointmentProps) {
  const queryClient = useQueryClient()
  const deleteAppointmentMutation = useMutation(deleteAppointment, {
    onSuccess: () => queryClient.invalidateQueries(),
  })

  function handleDelete() {
    deleteAppointmentMutation.mutate(appointment.id)
  }

  return (
    <Card maxW="sm" p={3}>
      <CardHeader>
        <Text>{appointment.memberId}</Text>
      </CardHeader>
      <CardBody>
        <Text>{appointment.dateTime}</Text>
        <Text>{appointment.location}</Text>
        <Text>{appointment.purpose}</Text>
      </CardBody>
      <CardFooter>
        <Link to={`/appointments/${appointment.id}`}>
          <Button>✏️</Button>
        </Link>
        <Button onClick={handleDelete}>❌</Button>
      </CardFooter>
    </Card>
  )
}

export default Appointment
