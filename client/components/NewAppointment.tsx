import { useState } from 'react'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import type { NewAppointment as NewAppointmentType } from '../../models/appointments'
import { addAppointment } from '../apis/appointments'
import { getAllFamilyMembers } from '../apis/members'
import { Member } from '../../models/family-members'

const initialData = {
  memberId: 0,
  dateTime: '',
  location: '',
  purpose: '',
}

function NewAppointment() {
  const [formData, setFormData] = useState<NewAppointmentType>(initialData)
  const queryClient = useQueryClient()
  const newAppointmentMutation = useMutation(addAppointment, {
    onSuccess: () => queryClient.invalidateQueries(),
  })
  const {
    data: members,
    isError,
    error,
  } = useQuery<Member[], Error>(['family-members'], getAllFamilyMembers)

  if (isError) {
    return <div>There was an error: {error?.message}</div>
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log(formData)
    newAppointmentMutation.mutate(formData)
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
    <form onSubmit={handleSubmit}>
      <h2>Add appointment</h2>
      <label htmlFor="memberId">Family member:</label>
      <select
        name="memberId"
        id="memberId"
        onChange={handleChange}
        value={formData.memberId}
      >
        <option value="0">Select a family member</option>
        {fetchOptions}
      </select>
      <label htmlFor="dateTime">When:</label>
      <input
        type="datetime"
        name="dateTime"
        id="dateTime"
        onChange={handleChange}
        value={formData.dateTime}
      />
      <label htmlFor="location">Where:</label>
      <input
        type="text"
        name="location"
        id="location"
        onChange={handleChange}
        value={formData.location}
      />
      <label htmlFor="purpose">Why:</label>
      <input
        type="text"
        name="purpose"
        id="purpose"
        onChange={handleChange}
        value={formData.purpose}
      />
      <button type="submit">Submit</button>
    </form>
  )
}

export default NewAppointment
