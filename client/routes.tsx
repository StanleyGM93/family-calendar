import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

import App from './components/App.tsx'
import UpdateAppointment from './components/UpdateAppointment.tsx'
import UpdateMember from './components/UpdateMember.tsx'

export const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route path="/appointments/:id" element={<UpdateAppointment />} />
    <Route path="/member/:id" element={<UpdateMember />} />
  </Route>
)

export const router = createBrowserRouter(routes)
