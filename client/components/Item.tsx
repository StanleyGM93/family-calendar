import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useState } from 'react'

import type { ListItem as ListItemType } from '../../models/list'
import { deleteListItem } from '../apis/list'
import UpdateItem from './UpdateItem'
import { ListItem, Text, Button, Heading } from '@chakra-ui/react'

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
    <ListItem>
      <Heading>{listItem.item}</Heading>
      <Text>Quantity: {listItem.quantity}</Text>
      <Button onClick={handleUpdate}>✏️</Button>
      <Button onClick={handleDelete}>❌</Button>
      {showUpdate && <UpdateItem listItem={listItem} onClose={closeUpdate} />}
    </ListItem>
  )
}

export default Item
