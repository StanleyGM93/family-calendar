import { Heading, Container, UnorderedList, ListItem } from '@chakra-ui/react'

function NavBar() {
  return (
    <Container>
      <Heading as="h1">Family Calendar 📅</Heading>
      <UnorderedList>
        <ListItem>Family members</ListItem>
        <ListItem>Appointments</ListItem>
        <ListItem>Shopping ListItemst</ListItem>
      </UnorderedList>
    </Container>
  )
}

export default NavBar
