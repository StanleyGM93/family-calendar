import {
  Button,
  Flex,
  HStack,
  Heading,
  Spacer,
  Tab,
  TabList,
  Tabs,
} from '@chakra-ui/react'

import { Link } from 'react-router-dom'
import ColorToggleButton from './ColorMode'

function NavBar() {
  return (
    <Flex as="nav" px={10} py={5}>
      <Heading as="h1">Family Calendar 📅</Heading>
      <Tabs variant={'soft-rounded'}>
        <TabList>
          <Link to={'/'}>
            <Tab>Dashboard</Tab>
          </Link>
          <Link to={'/list'}>
            <Tab>Shopping list</Tab>
          </Link>
          <Link to={'/appointments'}>
            <Tab>Appointments</Tab>
          </Link>
          <Link to={'/members'}>
            <Tab>Family members</Tab>
          </Link>
        </TabList>
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
