import db from './connection'
import { ListItem, ListUpdate, NewListItem } from '../../models/list'
import { getUserIdByEmail } from './utils.ts'

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

// Include userEmail as part of entry
// Need to work out user_id based off the email supplied
export function addListItem(userEmail: string, listItem: NewListItem) {
  const createdAt = Date.now()
  const userId = getUserIdByEmail(userEmail)
  const itemToAdd = {
    ...listItem,
    created_at: createdAt,
    user_id: userId,
    user_email: userEmail,
  }
  delete itemToAdd.userId
  return db('shopping_list').insert(itemToAdd)
}

export function deleteListItem(id: number) {
  return db('shopping_list').delete().where('id', id)
}
