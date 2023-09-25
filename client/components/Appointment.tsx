import { useQueryClient, useMutation } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

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
    <li>
      <p>{appointment.memberId}</p>
      <p>{appointment.dateTime}</p>
      <p>{appointment.location}</p>
      <p>{appointment.purpose}</p>
      <Link to={`/appointments/${appointment.id}`}>
        <button>✏️</button>
      </Link>
      <button onClick={handleDelete}>❌</button>
    </li>
  )
}

export default Appointment
