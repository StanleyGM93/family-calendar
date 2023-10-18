import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addListItem } from '../apis/list.ts'
import { Button, Heading } from '@chakra-ui/react'

const initialData = {
  item: '',
  quantity: 0,
}

function NewItem() {
  const [formData, setFormData] = useState(initialData)
  const queryClient = useQueryClient()
  const newItemMutation = useMutation(addListItem, {
    onSuccess: () => queryClient.invalidateQueries(),
  })

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    newItemMutation.mutate(formData)
    setFormData(initialData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Heading as="h2">Add an item</Heading>
      <div className="form-item">
        <label htmlFor="item">Item:</label>
        <input
          type="text"
          name="item"
          id="item"
          value={formData.item}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          name="quantity"
          id="quantity"
          value={formData.quantity}
          onChange={handleChange}
        />
      </div>
      <Button type="submit">Add item</Button>
    </form>
  )
}

export default NewItem
