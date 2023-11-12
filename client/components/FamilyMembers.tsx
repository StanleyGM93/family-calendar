import { useQuery } from '@tanstack/react-query'

import { AddIcon } from '@chakra-ui/icons'
import { Box, Button, Center, SimpleGrid } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { Member as MemberType } from '../../models/family-members.ts'
import { getAllFamilyMembers } from '../apis/members.ts'
import Member from './Member.tsx'

function FamilyMembers() {
  const {
    data: members,
    isError,
    error,
    isLoading,
  } = useQuery<MemberType[], Error>(['members'], getAllFamilyMembers)

  if (isError) {
    return <div>There was an error: {error?.message}</div>
  }

  if (isLoading) {
    return <div>Loading your shopping list</div>
  }

  if (!members) {
    return <div>Could not retrieve appointments</div>
  }

  const listItemsToRender = members.map((member) => (
    <Member member={member} key={member.id} />
  ))

  return (
    <Box p={10}>
      <Center as="h2" fontSize={'4xl'} fontWeight={'bold'}>
        Family Members
      </Center>
      <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} spacing={5} my={5}>
        {listItemsToRender}
      </SimpleGrid>
      <Center>
        <Link to={'/members/new'}>
          <Button p={6}>
            <AddIcon boxSize={6} />
          </Button>
        </Link>
      </Center>
    </Box>
  )
}

export default FamilyMembers
