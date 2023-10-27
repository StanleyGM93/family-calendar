import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

import App from './components/App.tsx'
import UpdateAppointment from './components/UpdateAppointment.tsx'
import UpdateMember from './components/UpdateMember.tsx'
import Appointments from './components/Appointments.tsx'
import NewAppointment from './components/NewAppointment.tsx'
import FamilyMembers from './components/FamilyMembers.tsx'
import NewMember from './components/NewMember.tsx'
import ShoppingList from './components/ShoppingList.tsx'
import NewItem from './components/NewItem.tsx'
import Dashboard from './components/Dashboard.tsx'

export const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<Dashboard />} />

    <Route path="/appointments" element={<Appointments />} />
    <Route path="/appointments/new" element={<NewAppointment />} />
    <Route path="/appointments/:id" element={<UpdateAppointment />} />

    <Route path="members" element={<FamilyMembers />} />
    <Route path="members/new" element={<NewMember />} />
    <Route path="/members/:id" element={<UpdateMember />} />

    <Route path="list" element={<ShoppingList />} />
    <Route path="list/:id" element={<NewItem />} />
  </Route>
)

export const router = createBrowserRouter(routes)
