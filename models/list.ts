export interface NewListItem {
  userId?: number
  item: string
  quantity: number
}

export interface ListUpdate {
  item: string
  quantity: string
}

export interface ListItem extends NewListItem {
  id: number
  createdAt: Date
}
