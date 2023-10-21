import { useQueryClient, useMutation } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

import { deleteFamilyMember } from '../apis/members.ts'
import type { Member as MemberType } from '../../models/family-members.ts'
import { Button, ListItem, Text } from '@chakra-ui/react'

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
    <ListItem>
      <Text>Name: {member.name}</Text>
      <Text>D.O.B: {member.dateOfBirth}</Text>
      <Text>Relationship: {member.relationship}</Text>

      <Link to={`/member/${member.id}`}>
        <Button>✏️</Button>
      </Link>
      <Button onClick={handleDelete}>❌</Button>
    </ListItem>
  )
}

export default Member
