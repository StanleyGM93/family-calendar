export interface NewListItem {
  userId?: number
  item: string
  quantity: number
}

export interface ListUpdate {
  id: number
  item: string
  quantity: string
}

export interface ListItem extends NewListItem {
  id: number
  createdAt: Date
}

export interface ListUpdatePayload {
  id: number
  data: {
    item: string
    quantity: number
  }
}
