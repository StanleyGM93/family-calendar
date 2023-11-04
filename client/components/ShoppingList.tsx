import { useQuery } from '@tanstack/react-query'

import { getAllListItems } from '../apis/list.ts'
import Item from './Item'
import { ListItem } from '../../models/list.ts'
import { Box, Button, Center, Heading, UnorderedList } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { AddIcon } from '@chakra-ui/icons'

function ShoppingList() {
  const {
    data: listItems,
    isLoading,
    isError,
    error,
  } = useQuery<ListItem[], Error>(['list-items'], getAllListItems)

  if (isError) {
    return <div>There was an error: {error?.message}</div>
  }

  if (isLoading) {
    return <div>Loading your shopping list</div>
  }

  if (!listItems) {
    return <div>Could not retrieve shopping list</div>
  }

  const listItemsToRender = listItems.map((listItem) => (
    <Item listItem={listItem} key={listItem.id} />
  ))

  return (
    <Box>
      <Heading as="h2">Shopping List</Heading>
      <UnorderedList m={5}>{listItemsToRender}</UnorderedList>
      <Center>
        <Link to={'/appointments/new'}>
          <Button p={6}>
            <AddIcon boxSize={6} />
          </Button>
        </Link>
      </Center>
    </Box>
  )
}

export default ShoppingList
