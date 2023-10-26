import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'

import Appointments from './Appointments'
import ColorToggleButton from './ColorMode'
import FamilyMembers from './FamilyMembers'
import ShoppingList from './ShoppingList'

function NavBar() {
  return (
    <Flex as="nav" p={5}>
      <Heading as="h1">Family Calendar 📅</Heading>

      <Tabs variant={'soft-rounded'}>
        <TabList>
          <Tab>Dashboard</Tab>
          <Tab>Shopping list</Tab>
          <Tab>Appointments</Tab>
          <Tab>Family Members</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Box>This is the dashboard</Box>
          </TabPanel>
          <TabPanel>
            <ShoppingList />
          </TabPanel>
          <TabPanel>
            <Appointments />
          </TabPanel>
          <TabPanel>
            <FamilyMembers />
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Spacer />
      <HStack>
        <ColorToggleButton />
        <Button>Sign in</Button>
      </HStack>
    </Flex>
  )
}

export default NavBar
