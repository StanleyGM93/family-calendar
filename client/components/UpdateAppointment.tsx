import { useEffect, useState } from 'react'
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { useParams, useNavigate } from 'react-router-dom'

import { Appointment } from '../../models/appointments.ts'
import { updateAppointment, getAppointmentById } from '../apis/appointments.ts'
import { Member } from '../../models/family-members.ts'
import { getAllFamilyMembers } from '../apis/members.ts'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
} from '@chakra-ui/react'

function UpdateAppointment() {
  const { id } = useParams()
  const navigate = useNavigate()
  const {
    data: appointmentToUpdate,
    isLoading,
    isError,
    error,
  } = useQuery<Appointment, Error>(['appointment'], () =>
    getAppointmentById(Number(id))
  )
  const {
    data: members,
    isLoading: membersLoading,
    isError: membersIsError,
    error: membersError,
  } = useQuery<Member[], Error>(['family-members'], getAllFamilyMembers)

  const initialFormData = {
    memberId: appointmentToUpdate?.memberId || '',
    dateTime: appointmentToUpdate?.dateTime || '',
    location: appointmentToUpdate?.location || '',
    purpose: appointmentToUpdate?.purpose || '',
  }

  const [formData, setFormData] = useState(initialFormData)
  const queryClient = useQueryClient()
  const updateAppointmentMutation = useMutation(updateAppointment, {
    onSuccess: () => queryClient.invalidateQueries(),
  })

  useEffect(() => {
    if (appointmentToUpdate) {
      setFormData({
        memberId: appointmentToUpdate.memberId,
        dateTime: appointmentToUpdate.dateTime,
        location: appointmentToUpdate.location,
        purpose: appointmentToUpdate.purpose,
      })
    }
  }, [appointmentToUpdate, id])

  if (isError || membersIsError) {
    return (
      <div>There was an error: {error?.message || membersError?.message} </div>
    )
  }

  if (isLoading || membersLoading) {
    return <div>Loading your shopping list</div>
  }

  if (!appointmentToUpdate || !members) {
    return <div>Could not retrieve shopping list</div>
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target
    const updatedValues = {
      ...formData,
      [name]: name === 'memberId' ? parseInt(value, 10) : value,
    }
    setFormData(updatedValues)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const updatedForm = {
      id: Number(id),
      data: {
        ...formData,
        memberId:
          typeof formData.memberId === 'string'
            ? parseInt(formData.memberId, 10)
            : formData.memberId,
      },
    }
    updateAppointmentMutation.mutate(updatedForm)
    navigate('/')
  }

  const fetchOptions = members?.map((member) => (
    <option key={member.id} value={member.id}>
      {member.name}
    </option>
  ))

  return (
    <Box p={10}>
      <form onSubmit={handleSubmit}>
        <Heading>Edit Appointment</Heading>
        <FormControl>
          <FormLabel htmlFor="memberId">Family member:</FormLabel>
          <Select
            name="memberId"
            id="memberId"
            onChange={handleChange}
            value={formData.memberId}
          >
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

        <Button type="submit" my={5}>
          Update
        </Button>
      </form>
    </Box>
  )
}

export default UpdateAppointment
