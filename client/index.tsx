import { createContext, useContext } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react'

import { router } from './routes.tsx'

const UserContext = createContext<User | undefined>(undefined)

export function useUser() {
  return useContext(UserContext)
}

function AuthProvider({ children }: any) {
  const { user } = useAuth0()
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

const queryClient = new QueryClient()

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <Auth0Provider
      domain="mako-stanley.au.auth0.com"
      clientId="FNfCsIaz3mOqNJUtePFquZDhV0HKfANa"
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
      <AuthProvider>
        <ChakraProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ReactQueryDevtools />
          </QueryClientProvider>
        </ChakraProvider>
      </AuthProvider>
    </Auth0Provider>
  )
})
