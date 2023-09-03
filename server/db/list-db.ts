import db from './connection'
import { ListItem, ListUpdate, NewListItem } from '../../models/list'

// table name = shopping_list

// Shopping list route functions
export function getAllListItems(): Promise<ListItem[]> {
  return db('shopping_list').select(
    'id',
    'user_id as userId',
    'item',
    'quantity',
    'created_at as createdAt'
  )
}

export function getListItemById(id: number): Promise<ListItem[]> {
  return db('shopping_list')
    .select(
      'id',
      'user_id as userId',
      'item',
      'quantity',
      'created_at as createdAt'
    )
    .where('id', id)
}

export function updateListItemById(
  id: number,
  updatedItem: ListUpdate
): object {
  return db('shopping_list').update(updatedItem).where('id', id)
}

export function addListItem(listItem: NewListItem) {
  const createdAt = Date.now()
  const itemToAdd = {
    ...listItem,
    created_at: createdAt,
    user_id: listItem.userId,
  }
  delete itemToAdd.userId
  return db('shopping_list').insert(itemToAdd)
}

export function deleteListItem(id: number) {
  return db('shopping_list').delete().where('id', id)
}
