export interface NewMember {
  userId?: number
  name: string
  relationship: string
  dateOfBirth: string
}

export interface MemberUpdate {
  name?: string
  relationship?: string
  dateOfBirth?: number
}

export interface Member extends NewMember {
  id: number
}
