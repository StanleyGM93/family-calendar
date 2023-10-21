import NavBar from './NavBar.tsx'
import ShoppingList from './ShoppingList.tsx'
import NewItem from './NewItem.tsx'
import Appointments from './Appointments.tsx'
import NewAppointment from './NewAppointment.tsx'
import FamilyMembers from './FamilyMembers.tsx'
import NewMember from './NewMember.tsx'

import { Box, SimpleGrid } from '@chakra-ui/react'

function App() {
  return (
    <>
      <header className="header">
        <NavBar />
      </header>
      <SimpleGrid p={2} spacing={4} minChildWidth="250px">
        <Box>
          <NewItem />
          <ShoppingList />
        </Box>
        <Box>
          <NewAppointment />
          <Appointments />
        </Box>
        <Box>
          <NewMember />
          <FamilyMembers />
        </Box>
      </SimpleGrid>
    </>
  )
}

export default App
