import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useState } from 'react'

import { ListItem } from '../../models/list'
import { deleteListItem } from '../apis/list'
import UpdateItem from './UpdateItem'

interface ItemProps {
  listItem: ListItem
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
    <li>
      <p>{listItem.item}</p>
      <p>Quantity: {listItem.quantity}</p>
      <button onClick={handleUpdate}>✏️</button>
      <button onClick={handleDelete}>❌</button>
      {showUpdate && <UpdateItem listItem={listItem} onClose={closeUpdate} />}
    </li>
  )
}

export default Item
