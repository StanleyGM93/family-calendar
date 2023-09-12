import NavBar from './NavBar.tsx'
import ShoppingList from './ShoppingList.tsx'
import NewItem from './NewItem.tsx'
import Appointments from './Appointments.tsx'

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
      <section>
        <Appointments />
      </section>
    </>
  )
}

export default App
