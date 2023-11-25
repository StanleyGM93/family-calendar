import { useEffect, useState } from 'react'
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { useParams, useNavigate } from 'react-router-dom'

import { getFamilyMemberById, updateFamilyMember } from '../apis/members'
import { Member as MemberType } from '../../models/family-members'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react'
import { useUser } from '../index.tsx'

function UpdateMember() {
  const { id } = useParams()
  const navigate = useNavigate()
  const {
    data: memberToUpdate,
    isLoading,
    isError,
    error,
  } = useQuery<MemberType, Error>(['member'], () =>
    getFamilyMemberById(Number(id))
  )
  const user = useUser()
  console.log('Below is the member user')
  console.log(user)

  const initialFormData = {
    name: memberToUpdate?.name || '',
    relationship: memberToUpdate?.relationship || '',
    dateOfBirth: memberToUpdate?.dateOfBirth || '',
  }

  const [formData, setFormData] = useState(initialFormData)
  const queryClient = useQueryClient()
  const updateMemberMutation = useMutation(updateFamilyMember, {
    onSuccess: () => queryClient.invalidateQueries(),
  })

  useEffect(() => {
    if (memberToUpdate) {
      setFormData({
        name: memberToUpdate.name,
        relationship: memberToUpdate.relationship,
        dateOfBirth: memberToUpdate.dateOfBirth,
      })
    }
  }, [memberToUpdate, id])

  if (isError) {
    return <p>There was an error: {error?.message}</p>
  }

  if (isLoading) {
    return <p>Loading your family members</p>
  }

  if (!memberToUpdate) {
    return <p>Could not retrieve family members</p>
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    const updatedValues = {
      ...formData,
      [name]: value,
    }
    setFormData(updatedValues)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const updatedForm = {
      id: Number(id),
      data: { ...formData },
    }
    updateMemberMutation.mutate(updatedForm)
    navigate('/members')
  }

  return (
    <Box px={10}>
      <form onSubmit={handleSubmit}>
        <Heading as="h3">Edit family member</Heading>
        <FormControl>
          <FormLabel htmlFor="name">Name:</FormLabel>
          <Input
            name="name"
            id="name"
            onChange={handleChange}
            value={formData.name}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="relationship">Relationship:</FormLabel>
          <Input
            type="text"
            name="relationship"
            id="relationship"
            onChange={handleChange}
            value={formData.relationship}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="dob">Date of birth:</FormLabel>
          <Input
            type="date"
            name="dateOfBirth"
            id="dob"
            onChange={handleChange}
            value={formData.dateOfBirth}
          />
        </FormControl>
        <Button type="submit" my={5}>
          Update
        </Button>
      </form>
    </Box>
  )
}

export default UpdateMember
