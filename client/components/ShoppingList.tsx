import { useQuery } from '@tanstack/react-query'

import { Box, Heading, UnorderedList } from '@chakra-ui/react'
import { ListItem } from '../../models/list.ts'
import { getAllListItems } from '../apis/list.ts'
import Item from './Item'
import NewItem from './NewItem.tsx'

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
    <Box p={5}>
      <Heading as="h2">Shopping List</Heading>
      <NewItem />
      <UnorderedList m={5} p={5}>
        {listItemsToRender}
      </UnorderedList>
    </Box>
  )
}

export default ShoppingList
