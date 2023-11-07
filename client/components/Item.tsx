import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Button, Card, Flex, ListItem, Spacer, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import type { ListItem as ListItemType } from '../../models/list'
import { deleteListItem } from '../apis/list'

interface ItemProps {
  listItem: ListItemType
}

function Item({ listItem }: ItemProps) {
  const queryClient = useQueryClient()
  const deleteItemMutation = useMutation(deleteListItem, {
    onSuccess: () => queryClient.invalidateQueries(),
  })

  function handleDelete() {
    deleteItemMutation.mutate(listItem.id)
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
          <Link to={`${listItem.id}`}>
            <Button m={2}>✏️</Button>
          </Link>
          <Button onClick={handleDelete} m={2}>
            ❌
          </Button>
        </Flex>
      </Card>
    </ListItem>
  )
}

export default Item
