import {
  Heading,
  Flex,
  Button,
  Spacer,
  HStack,
  Tabs,
  TabList,
  Tab,
  Center,
} from '@chakra-ui/react'

import ColorToggleButton from './ColorMode'

function NavBar() {
  return (
    <Flex as="nav" p={5} borderBottom="1px">
      <Heading as="h1">Family Calendar 📅</Heading>
      <Center>
        <Tabs variant={'soft-rounded'}>
          <TabList>
            <Tab>Dashboard</Tab>
            <Tab>Shopping list</Tab>
            <Tab>Appointments</Tab>
            <Tab>Family Members</Tab>
          </TabList>
        </Tabs>
      </Center>
      <Spacer />
      <HStack>
        <ColorToggleButton />
        <Button>Sign in</Button>
      </HStack>
    </Flex>
  )
}

export default NavBar
