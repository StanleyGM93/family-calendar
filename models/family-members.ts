export interface NewMember {
  userId?: number
  name: string
  relationship: string
  dateOfBirth: string
}

export interface MemberUpdate {
  data: {
    id: number
    name?: string
    relationship?: string
    dateOfBirth?: string
  }
}

export interface Member extends NewMember {
  id: number
}
