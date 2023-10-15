import { useEffect, useState } from 'react'
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { useParams, useNavigate } from 'react-router-dom'

import { getFamilyMemberById, updateFamilyMember } from '../apis/members'
import { Member as MemberType } from '../../models/family-members'

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
    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit family member</h2>
      <label htmlFor="name">Name:</label>
      <input
        name="name"
        id="name"
        onChange={handleChange}
        value={formData.name}
      ></input>
      <label htmlFor="relationship">Relationship:</label>
      <input
        type="text"
        name="relationship"
        id="relationship"
        onChange={handleChange}
        value={formData.relationship}
      />
      <label htmlFor="dob">Date of birth:</label>
      <input
        type="date"
        name="dateOfBirth"
        id="dob"
        onChange={handleChange}
        value={formData.dateOfBirth}
      />

      <button type="submit">Update</button>
    </form>
  )
}

export default UpdateMember
