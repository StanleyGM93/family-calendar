import request from 'superagent'
import { ListItem, NewListItem, ListUpdatePayload } from '../../models/list'

const url = '/api/v1/list/'

export async function getAllListItems(): Promise<ListItem[]> {
  const response = await request.get(url)
  return response.body
}

export async function getListItemById(id: number) {
  const response = await request.get(`${url}${id}`)
  return response.body
}

export async function addListItem(newListItem: NewListItem) {
  const response = await request.post(`${url}/item`).send(newListItem)
  return response.statusCode
}

export async function updateListItem(
  listItemInfo: ListUpdatePayload
): Promise<number> {
  const { id, data } = listItemInfo
  const response = await request.patch(`${url}${id}`).send(data)
  return response.statusCode
}

export async function deleteListItem(id: number) {
  const response = await request.delete(`${url}${id}`)
  return response.statusCode
}
