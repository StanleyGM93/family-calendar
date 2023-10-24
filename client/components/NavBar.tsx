import { Heading, Flex, Button, Spacer, HStack } from '@chakra-ui/react'

import ColorToggleButton from './ColorMode'

function NavBar() {
  return (
    <Flex as="nav" p={5} borderBottom={'gray.300'}>
      <Heading as="h1">Family Calendar 📅</Heading>
      <Spacer></Spacer>
      <HStack>
        <ColorToggleButton />
        <Button>Sign in</Button>
      </HStack>
    </Flex>
  )
}

export default NavBar
