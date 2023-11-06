import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useState } from 'react'

import type { ListItem as ListItemType } from '../../models/list'
import { deleteListItem } from '../apis/list'
import UpdateItem from './UpdateItem'
import {
  ListItem,
  Text,
  Button,
  Heading,
  Flex,
  Spacer,
  Card,
} from '@chakra-ui/react'

interface ItemProps {
  listItem: ListItemType
}

function Item({ listItem }: ItemProps) {
  const [showUpdate, setShowUpdate] = useState(false)
  const queryClient = useQueryClient()
  const deleteItemMutation = useMutation(deleteListItem, {
    onSuccess: () => queryClient.invalidateQueries(),
  })

  function handleDelete() {
    deleteItemMutation.mutate(listItem.id)
  }

  function handleUpdate() {
    setShowUpdate(true)
  }

  function closeUpdate() {
    setShowUpdate(false)
  }

  return (
    <ListItem as="li">
      <Card>
        <Flex alignItems={'center'}>
          <Text fontSize="xl" p={4}>
            {listItem.item}
          </Text>
          <Spacer />

          <Text fontSize="xl" p={4}>
            Quantity: {listItem.quantity}
          </Text>
          <Button onClick={handleUpdate} m={2}>
            ✏️
          </Button>
          <Button onClick={handleDelete} m={2}>
            ❌
          </Button>
          {showUpdate && (
            <UpdateItem listItem={listItem} onClose={closeUpdate} />
          )}
        </Flex>
      </Card>
    </ListItem>
  )
}

export default Item
