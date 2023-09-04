import request from 'superagent'
import { NewMember, MemberUpdate } from '../../models/family-members'

export async function getAllFamilyMembers() {
  const response = await request.get('/members')
  return response.body
}

export async function getFamilyMemberById(id: number) {
  const response = await request.get(`/members/${id}`)
  return response.body
}

export async function addFamilyMember(newFamilyMember: NewMember) {
  const response = await request.post('/members').send(newFamilyMember)
  return response.statusCode
}

export async function updateFamilyMember(
  id: number,
  updatedFamilyMember: MemberUpdate
) {
  const response = await request
    .patch(`/members/${id}`)
    .send(updatedFamilyMember)
  return response.statusCode
}

export async function deleteFamilyMember(id: number) {
  const response = await request.delete(`/members/${id}`)
  return response.statusCode
}
