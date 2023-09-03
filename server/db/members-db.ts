import db from './connection'
import { NewMember, MemberUpdate, Member } from '../../models/family-members'

// family_members

export function getAllFamilyMembers(): Promise<Member[]> {
  return db('family_members').select(
    'id',
    'user_id as userId',
    'name',
    'relationship',
    'date_of_birth as dateOfBirth'
  )
}

export function getFamilyMemberById(id: number): Promise<Member[]> {
  return db('family_members')
    .select(
      'id',
      'user_id as userId',
      'name',
      'relationship',
      'date_of_birth as dateOfBirth'
    )
    .where('id', id)
}

export function updateFamilyMemberById(id: number, updatedInfo: MemberUpdate) {
  return db('family_members').update(updatedInfo).where('id', id)
}

export function addFamilyMember(newFamilyMemberInfo: NewMember) {
  const { userId, name, relationship, dateOfBirth } = newFamilyMemberInfo
  const infoToAdd = {
    user_id: userId,
    name,
    relationship,
    date_of_birth: dateOfBirth,
  }
  return db('family_members').insert(infoToAdd)
}

export function deleteFamilyMember(id: number) {
  return db('family_members').delete().where('id', id)
}
