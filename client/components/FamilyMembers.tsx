import { useQuery } from '@tanstack/react-query'

import { getAllFamilyMembers } from '../apis/members.ts'
import { Member as MemberType } from '../../models/family-members.ts'
import Member from './Member.tsx'

function FamilyMembers() {
  const {
    data: members,
    isError,
    error,
    isLoading,
  } = useQuery<MemberType[], Error>(['members'], getAllFamilyMembers)

  if (isError) {
    return <div>There was an error: {error?.message}</div>
  }

  if (isLoading) {
    return <div>Loading your shopping list</div>
  }

  if (!members) {
    return <div>Could not retrieve appointments</div>
  }

  const listItemsToRender = members.map((member) => (
    <Member member={member} key={member.id} />
  ))

  return (
    <section>
      <h2>Family Members</h2>
      <ul>{listItemsToRender}</ul>
    </section>
  )
}

export default FamilyMembers
