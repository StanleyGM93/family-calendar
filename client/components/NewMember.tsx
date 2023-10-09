import { useState } from 'react'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import type { NewMember as NewMemberType } from '../../models/family-members'
import { addFamilyMember } from '../apis/members'

const initialData = {
  name: '',
  relationship: '',
  dateOfBirth: '',
}

function NewMember() {}

export default NewMember
