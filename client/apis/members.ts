import request from 'superagent'
import { NewMember, MemberUpdate } from '../../models/family-members'

export async function getAllFamilyMembers() {
  const response = await request.get('/api/v1/members')
  return response.body
}

export async function getFamilyMemberById(id: number) {
  const response = await request.get(`/api/v1/members/${id}`)
  return response.body[0]
}

export async function addFamilyMember(
  newFamilyMember: NewMember,
  token: string,
  userEmail: string
) {
  const response = await request
    .post(`/api/v1/members/${userEmail}`)
    .set('Authorization', 'Bearer' + token)
    .send(newFamilyMember)
  return response.statusCode
}

// Do I want the user email included in path?
export async function updateFamilyMember(
  updatedFamilyMember: MemberUpdate,
  token: string
) {
  const { data } = updatedFamilyMember
  const { id } = data
  const response = await request
    .patch(`/api/v1/members/${id}`)
    .set('Authorization', 'Bearer' + token)
    .send(data)
  return response.statusCode
}

export async function deleteFamilyMember(id: number) {
  const response = await request.delete(`/api/v1/members/${id}`)
  return response.statusCode
}
