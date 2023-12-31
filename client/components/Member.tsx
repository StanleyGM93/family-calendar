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
import type { Member as MemberType } from '../../models/family-members.ts'
import { deleteFamilyMember } from '../apis/members.ts'

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
    <Card maxW={'sm'}>
      <CardHeader py={2}>
        <Text fontSize={'xl'}> {member.name}</Text>
      </CardHeader>
      <CardBody>
        <Text>D.O.B: {member.dateOfBirth}</Text>
        <Text>Relationship: {member.relationship}</Text>
      </CardBody>
      <CardFooter>
        <Link to={`/members/${member.id}`}>
          <Button>✏️</Button>
        </Link>
        <Button onClick={handleDelete}>❌</Button>
      </CardFooter>
    </Card>
  )
}

export default Member
