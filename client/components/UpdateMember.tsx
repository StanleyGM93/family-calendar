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
  const updateAppointmentMutation = useMutation(updateFamilyMember, {
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

  return 'Update member component'
}

export default UpdateMember
