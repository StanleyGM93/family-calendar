import { useState } from 'react'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import type { NewAppointment as NewAppointmentType } from '../../models/appointments'
import { addAppointment } from '../apis/appointments'
import { getAllFamilyMembers } from '../apis/members'
import { Member } from '../../models/family-members'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
} from '@chakra-ui/react'
import { useAuth0 } from '@auth0/auth0-react'

const initialData = {
  memberId: 0,
  dateTime: '',
  location: '',
  purpose: '',
}

function NewAppointment() {
  const [formData, setFormData] = useState<NewAppointmentType>(initialData)
  const queryClient = useQueryClient()
  const newAppointmentMutation = useMutation(addAppointmentWrapper, {
    onSuccess: () => queryClient.invalidateQueries(),
  })
  const {
    data: members,
    isError,
    error,
  } = useQuery<Member[], Error>(['family-members'], getAllFamilyMembers)
  // Auth0 info
  const { getAccessTokenSilently, user } = useAuth0()

  if (isError) {
    return <div>There was an error: {error?.message}</div>
  }

  async function addAppointmentWrapper(
    updatedFamilyMember: NewAppointmentType
  ): Promise<number> {
    const token = await getAccessTokenSilently()
    const userEmail = user?.email || ''
    return addAppointment(updatedFamilyMember, token, userEmail)
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    newAppointmentMutation.mutate(formData)
    const token = await getAccessTokenSilently()
    console.log(token)

    setFormData(initialData)
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: name === 'memberId' ? parseInt(value, 10) : value,
    })
  }

  const fetchOptions = members?.map((member) => (
    <option key={member.id} value={member.id}>
      {member.name}
    </option>
  ))

  return (
    <Box p={10}>
      <form onSubmit={handleSubmit}>
        <Heading as="h2">Add appointment</Heading>
        <FormControl>
          <FormLabel htmlFor="memberId">Family member:</FormLabel>
          <Select
            name="memberId"
            id="memberId"
            onChange={handleChange}
            value={formData.memberId}
          >
            <option value="0">Select a family member</option>
            {fetchOptions}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="dateTime">When:</FormLabel>
          <Input
            type="datetime-local"
            name="dateTime"
            id="dateTime"
            onChange={handleChange}
            value={formData.dateTime}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="location">Where:</FormLabel>
          <Input
            type="text"
            name="location"
            id="location"
            onChange={handleChange}
            value={formData.location}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="purpose">Why:</FormLabel>
          <Input
            type="text"
            name="purpose"
            id="purpose"
            onChange={handleChange}
            value={formData.purpose}
          />
        </FormControl>
        <Button type="submit" mt={5}>
          Submit
        </Button>
      </form>
    </Box>
  )
}

export default NewAppointment
