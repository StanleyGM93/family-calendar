import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { NewMember as NewMemberType } from '../../models/family-members'
import { addFamilyMember } from '../apis/members'

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

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    newItemMutation.mutate(formData)
    setFormData(initialData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Family Member</h2>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="relationship">Relationship</label>
        <input
          type="text"
          name="relationship"
          id="relationship"
          value={formData.relationship}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="dob">Date of birth</label>
        <input
          type="date"
          name="dateOfBirth"
          id="dob"
          value={formData.dateOfBirth}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Add family member</button>
    </form>
  )
}

export default NewMember
