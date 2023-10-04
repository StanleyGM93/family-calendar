import { useQueryClient, useMutation } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

import { deleteFamilyMember } from '../apis/members'

function Member() {
  const queryClient = useQueryClient()
  const deleteAppointmentMutation = useMutation(deleteFamilyMember, {
    onSuccess: () => queryClient.invalidateQueries(),
  })

  function handleDelete() {
    deleteAppointmentMutation.mutate(appointment.id)
  }

  return (
    <li>
      <p>{appointment.memberId}</p>

      <Link to={`/appointments/${appointment.id}`}>
        <button>✏️</button>
      </Link>
      <button onClick={handleDelete}>❌</button>
    </li>
  )
}

export default Member
