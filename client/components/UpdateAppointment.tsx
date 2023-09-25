import { useState } from 'react'
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import { AppointmentUpdate } from '../../models/appointments.ts'
import { updateAppointment, getAppointmentById } from '../apis/appointments.ts'

function UpdateAppointment() {
  const { id } = useParams()
  const {
    data: appointmentToUpdate,
    isLoading,
    isError,
    error,
  } = useQuery<AppointmentUpdate, Error>(['appointment'], () =>
    getAppointmentById(Number(id))
  )

  const initialFormData = {
    memberId: appointmentToUpdate?.memberId,
    dateTime: appointmentToUpdate?.dateTime,
    location: appointmentToUpdate?.location,
    purpose: appointmentToUpdate?.purpose,
  }

  const [formData, setFormData] = useState(initialFormData)
  const queryClient = useQueryClient()
  const updateAppointmentMutation = useMutation(updateAppointment, {
    onSuccess: () => queryClient.invalidateQueries(),
  })

  if (isError) {
    return <div>There was an error: {error?.message}</div>
  }

  if (isLoading) {
    return <div>Loading your shopping list</div>
  }

  if (!appointmentToUpdate) {
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
    const updatedListItemInfo = {
      id: listItem.id,
      data: formData,
    }
    updateAppointmentMutation.mutate(updatedListItemInfo)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Appointment</h2>
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

      <button type="submit">Update</button>
    </form>
  )
}

export default UpdateAppointment
