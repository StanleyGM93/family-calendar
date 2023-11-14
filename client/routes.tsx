import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

import App from './components/App.tsx'
import Appointments from './components/Appointments.tsx'
import Dashboard from './components/Dashboard.tsx'
import FamilyMembers from './components/FamilyMembers.tsx'
import NewAppointment from './components/NewAppointment.tsx'
import NewMember from './components/NewMember.tsx'
import ShoppingList from './components/ShoppingList.tsx'
import UpdateAppointment from './components/UpdateAppointment.tsx'
import UpdateItem from './components/UpdateItem.tsx'
import UpdateMember from './components/UpdateMember.tsx'

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
    <Route path="list/:id" element={<UpdateItem />} />
  </Route>
)

export const router = createBrowserRouter(routes)
