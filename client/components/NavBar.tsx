import {
  Button,
  Flex,
  HStack,
  Heading,
  Spacer,
  Tab,
  TabList,
  Tabs,
  Text,
} from '@chakra-ui/react'
import { useAuth0 } from '@auth0/auth0-react'

import { Link } from 'react-router-dom'
import ColorToggleButton from './ColorMode'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated.tsx'

function NavBar() {
  const { logout, loginWithRedirect, user } = useAuth0()

  function handleSignOut() {
    logout()
  }

  function handleSignIn() {
    loginWithRedirect()
  }

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
        <IfAuthenticated>
          <Button onClick={handleSignOut}>Sign out</Button>
          {user && <Text>Signed in as: {user.given_name}</Text>}
        </IfAuthenticated>
        <IfNotAuthenticated>
          <Button onClick={handleSignIn}>Sign in</Button>
        </IfNotAuthenticated>
      </HStack>
    </Flex>
  )
}

export default NavBar
