import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { Auth0Provider } from '@auth0/auth0-react'
import { createContext } from 'react'

import { router } from './routes.tsx'

const queryClient = new QueryClient()
const AuthContext = createContext(null)

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <Auth0Provider
      domain="mako-stanley.au.auth0.com"
      clientId="FNfCsIaz3mOqNJUtePFquZDhV0HKfANa"
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </ChakraProvider>
    </Auth0Provider>
  )
})
