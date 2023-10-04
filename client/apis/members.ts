import request from 'superagent'
import { NewMember, MemberUpdate } from '../../models/family-members'

export async function getAllFamilyMembers() {
  const response = await request.get('/api/v1/members')
  return response.body
}

export async function getFamilyMemberById(id: number) {
  const response = await request.get(`/api/v1/members/${id}`)
  return response.body
}

export async function addFamilyMember(newFamilyMember: NewMember) {
  const response = await request.post('/api/v1/members').send(newFamilyMember)
  return response.statusCode
}

export async function updateFamilyMember(
  id: number,
  updatedFamilyMember: MemberUpdate
) {
  const response = await request
    .patch(`/api/v1/members/${id}`)
    .send(updatedFamilyMember)
  return response.statusCode
}

export async function deleteFamilyMember(id: number) {
  const response = await request.delete(`/api/v1/members/${id}`)
  return response.statusCode
}