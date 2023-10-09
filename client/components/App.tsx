import NavBar from './NavBar.tsx'
import ShoppingList from './ShoppingList.tsx'
import NewItem from './NewItem.tsx'
import Appointments from './Appointments.tsx'
import NewAppointment from './NewAppointment.tsx'
import FamilyMembers from './FamilyMembers.tsx'
import NewMember from './NewMember.tsx'

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
      </section>
      <section>
        <NewMember />
        <FamilyMembers />
      </section>
    </>
  )
}

export default App
