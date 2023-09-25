import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

import App from './components/App.js'
import UpdateAppointment from './components/UpdateAppointment.js'

export const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route path="/appointments/:id" element={<UpdateAppointment />} />
  </Route>
)

export const router = createBrowserRouter(routes)
