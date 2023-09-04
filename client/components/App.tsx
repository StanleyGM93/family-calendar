import NavBar from './NavBar.tsx'
import ShoppingList from './ShoppingList.tsx'
import NewItem from './NewItem.tsx'

function App() {
  return (
    <>
      <header className="header">
        <NavBar />
      </header>
      <section className="main">
        <NewItem />
        <ShoppingList />
      </section>
    </>
  )
}

export default App
