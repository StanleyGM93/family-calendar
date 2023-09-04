import { useQuery } from '@tanstack/react-query'

import { getAllListItems } from '../apis/list.ts'
import Item from './Item'

function ShoppingList() {
  const {
    data: listItems,
    isLoading,
    isError,
  } = useQuery(['list-items'], getAllListItems)

  if (isError) {
    return <div>There was an error trying to get the shopping list</div>
  }

  if (isLoading) {
    return <div>Loading your shopping list</div>
  }

  if (!listItems) {
    return <div>Could not retrieve shopping list</div>
  }

  const listItemsToRender = listItems.map((listItem) => (
    <Item listItem={listItem} key={listItem.id} />
  ))

  return (
    <section>
      <h2>Shopping List</h2>
      <ul>{listItemsToRender}</ul>
    </section>
  )
}

export default ShoppingList
