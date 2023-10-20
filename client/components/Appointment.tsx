import { useQueryClient, useMutation } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

import type { Appointment as AppointmentType } from '../../models/appointments'
import { deleteAppointment } from '../apis/appointments'
import { ListItem, Text, Button } from '@chakra-ui/react'

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
    <ListItem>
      <Text>{appointment.memberId}</Text>
      <Text>{appointment.dateTime}</Text>
      <Text>{appointment.location}</Text>
      <Text>{appointment.purpose}</Text>
      <Link to={`/appointments/${appointment.id}`}>
        <Button>✏️</Button>
      </Link>
      <Button onClick={handleDelete}>❌</Button>
    </ListItem>
  )
}

export default Appointment
