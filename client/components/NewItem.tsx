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
import { useAuth0 } from '@auth0/auth0-react'

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
  // Auth0 info
  const { getAccessTokenSilently } = useAuth0()

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    newItemMutation.mutate(formData)
    const token = await getAccessTokenSilently()
    console.log(token)

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
