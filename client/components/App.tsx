import NavBar from './NavBar.tsx'
import ShoppingList from './ShoppingList.tsx'
import NewItem from './NewItem.tsx'
import Appointments from './Appointments.tsx'
import NewAppointment from './NewAppointment.tsx'
import { Outlet } from 'react-router-dom'

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
        <NewAppointment />
        <Appointments />
        <Outlet />
      </section>
    </>
  )
}

export default App
