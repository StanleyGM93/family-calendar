import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { NewMember as NewMemberType } from '../../models/family-members'
import { addFamilyMember } from '../apis/members'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react'
import { useAuth0 } from '@auth0/auth0-react'

const initialData = {
  name: '',
  relationship: '',
  dateOfBirth: '',
}

function NewMember() {
  const [formData, setFormData] = useState<NewMemberType>(initialData)
  const queryClient = useQueryClient()
  const newItemMutation = useMutation(addFamilyMember, {
    onSuccess: () => queryClient.invalidateQueries(),
  })
  // Auth0 info
  const { getAccessTokenSilently } = useAuth0()

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    newItemMutation.mutate(formData)
    const token = await getAccessTokenSilently()
    console.log(token)

    setFormData(initialData)
  }

  return (
    <Box p={10}>
      <form onSubmit={handleSubmit}>
        <Heading as="h2">Add Family Member</Heading>
        <FormControl>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="relationship">Relationship</FormLabel>
          <Input
            type="text"
            name="relationship"
            id="relationship"
            value={formData.relationship}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="dob">Date of birth</FormLabel>
          <Input
            type="date"
            name="dateOfBirth"
            id="dob"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </FormControl>
        <Button type="submit" my={5}>
          Add family member
        </Button>
      </form>
    </Box>
  )
}

export default NewMember
