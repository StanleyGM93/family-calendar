import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { useAuth0 } from '@auth0/auth0-react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'
import { ListItem, ListUpdatePayload } from '../../models/list.ts'
import { getListItemById, updateListItem } from '../apis/list.ts'

function UpdateItem() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: listItemData } = useQuery<ListItem, Error>(
    ['appointment'],
    () => getListItemById(Number(id))
  )
  const { getAccessTokenSilently } = useAuth0()

  const initialFormData = {
    item: listItemData?.item || '',
    quantity: listItemData?.quantity || 0,
  }

  const [formData, setFormData] = useState(initialFormData)
  const queryClient = useQueryClient()
  const updateItemMutation = useMutation(updateItemWrapper, {
    onSuccess: () => queryClient.invalidateQueries(),
  })

  async function updateItemWrapper(
    updatedListItemInfo: ListUpdatePayload
  ): Promise<number> {
    const token = await getAccessTokenSilently()
    return updateListItem(updatedListItemInfo, token)
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    const updatedValues = {
      ...formData,
      [name]: value,
    }
    setFormData(updatedValues)
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
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
