import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'
import { ListItem } from '../../models/list.ts'
import { getListItemById, updateListItem } from '../apis/list'
import { useUser } from '../index.tsx'

function UpdateItem() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: listItemData } = useQuery<ListItem, Error>(
    ['appointment'],
    () => getListItemById(Number(id))
  )
  const user = useUser()
  console.log('Below is the list item user')
  console.log(user)

  const initialFormData = {
    item: listItemData?.item || '',
    quantity: listItemData?.quantity || 0,
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
      id: Number(id),
      data: formData,
    }
    updateItemMutation.mutate(updatedListItemInfo)
    navigate('/list')
  }

  return (
    <Box px={10}>
      <form onSubmit={handleSubmit}>
        <Heading as="h3">Edit Item:</Heading>

        <FormControl mb={3}>
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
          Update
        </Button>
      </form>
    </Box>
  )
}

export default UpdateItem
