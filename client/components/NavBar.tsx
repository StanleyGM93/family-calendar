import { Heading, Flex, Button, Spacer, HStack } from '@chakra-ui/react'

function NavBar() {
  return (
    <Flex as="nav" bg={'gray.200'}>
      <Heading as="h1">Family Calendar 📅</Heading>
      <Spacer></Spacer>
      <HStack>
        <Button>Sign in</Button>
      </HStack>
    </Flex>
  )
}

export default NavBar
