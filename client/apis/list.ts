import request from 'superagent'
import { ListUpdate, NewListItem } from '../../models/list'

export async function getAllListItems() {
  const response = await request.get('/items')
  return response.body
}

export async function getListItemById(id: number) {
  const response = await request.get(`/items/${id}`)
  return response.body
}

export async function addListItem(newListItem: NewListItem) {
  const response = await request.post('/items').send(newListItem)
  return response.statusCode
}

export async function updateListItem(id: number, updatedListItem: ListUpdate) {
  const response = await request.patch(`/items/${id}`).send(updatedListItem)
  return response.statusCode
}

export async function deleteListItem(id: number) {
  const response = await request.delete(`/items/${id}`)
  return response.statusCode
}
