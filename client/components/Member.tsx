import { useQueryClient, useMutation } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

import { deleteFamilyMember } from '../apis/members.ts'
import type { Member as MemberType } from '../../models/family-members.ts'

interface MemberProps {
  member: MemberType
}

function Member({ member }: MemberProps) {
  const queryClient = useQueryClient()
  const deleteMemberMutation = useMutation(deleteFamilyMember, {
    onSuccess: () => queryClient.invalidateQueries(),
  })

  function handleDelete() {
    deleteMemberMutation.mutate(member.id)
  }

  return (
    <li>
      <p>Name: {member.name}</p>
      <p>D.O.B: {member.dateOfBirth}</p>
      <p>Relationship: {member.relationship}</p>

      <Link to={`/member/${member.id}`}>
        <button>✏️</button>
      </Link>
      <button onClick={handleDelete}>❌</button>
    </li>
  )
}

export default Member
