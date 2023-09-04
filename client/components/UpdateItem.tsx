import { useState } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'

import { ListItem } from '../../models/list'
import { updateListItem } from '../apis/list'

interface UpdateItemProps {
  listItem: ListItem
  onClose: () => void
}

function UpdateItem({ listItem, onClose }: UpdateItemProps) {
  const { item, quantity } = listItem
  const initialFormData = {
    item,
    quantity,
  }
  const [formData, setFormData] = useState(initialFormData)
  const queryClient = useQueryClient()
  const updateItemMutation = useMutation(updateListItem, {
    onSuccess: () => queryClient.invalidateQueries(),
  })

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    const updatedValues = {
      ...formData,
      [name]: value,
    }
    setFormData(updatedValues)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const updatedListItemInfo = {
      id: listItem.id,
      data: formData,
    }
    updateItemMutation.mutate(updatedListItemInfo)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Item:</h2>

      <label htmlFor="item">Item:</label>
      <input
        type="text"
        name="item"
        id="item"
        value={formData.item}
        onChange={handleChange}
      />

      <label htmlFor="quantity">Quantity:</label>
      <input
        type="number"
        name="quantity"
        id="quantity"
        value={formData.quantity}
        onChange={handleChange}
      />

      <button type="submit">Update</button>
    </form>
  )
}

export default UpdateItem
