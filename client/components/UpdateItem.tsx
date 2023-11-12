import { useState } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'

import { ListItem } from '../../models/list'
import { updateListItem } from '../apis/list'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'

interface UpdateItemProps {
  listItem: ListItem
  onClose: () => void
}

function UpdateItem() {
  const { id } = useParams()
  const navigate = useNavigate()
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
    navigate('/list')
  }

  return (
    <Box>
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
        <Button type="submit">Update</Button>
      </form>
    </Box>
  )
}

export default UpdateItem
