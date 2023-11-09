import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addListItem } from '../apis/list.ts'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react'

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
    <Box px={10}>
      <form onSubmit={handleSubmit}>
        <Heading as="h2" size={'lg'}>
          Add an item
        </Heading>
        <FormControl>
          <FormLabel htmlFor="item">Item:</FormLabel>
          <Input
            type="text"
            name="item"
            id="item"
            value={formData.item}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="quantity">Quantity:</FormLabel>
          <Input
            type="number"
            name="quantity"
            id="quantity"
            value={formData.quantity}
            onChange={handleChange}
          />
        </FormControl>
        <Button type="submit" my={5}>
          Add item
        </Button>
      </form>
    </Box>
  )
}

export default NewItem
