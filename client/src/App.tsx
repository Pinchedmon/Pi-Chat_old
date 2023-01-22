import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { QueryClientProvider, QueryClient } from 'react-query'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import useAuth, { AuthProvider } from './hooks/useAuth'

interface iUser {
  ID: number
  email: string
  pathImg: string
  name: string
  username: string
  info: string
  role: string
  backImg: string
  notys: number
  msgNotys: number
  refetchUser: () => void
}
export const UserContext = React.createContext<iUser>(null)

const AuthenticatedRoute = (props: { component: () => JSX.Element }) => {
  const { user, refetchUser } = useAuth()
  if (document.cookie === '0' || !document.cookie) return <Navigate to='/login' />
  if (user !== undefined) {
    return (
      <UserContext.Provider value={{ ...user, refetchUser }}>
        <props.component />
      </UserContext.Provider>
    )
  }
}
const App = () => {
  const queryClient = new QueryClient()
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route
              path='/*'
              element={
                <AuthProvider>
                  <AuthenticatedRoute component={() => <Home />} />
                </AuthProvider>
              }
            />
            <Route
              path='/signup'
              element={
                <AuthProvider>
                  <SignUp />
                </AuthProvider>
              }
            />
            <Route
              path='/login'
              element={
                <AuthProvider>
                  <Login />
                </AuthProvider>
              }
            />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}
export default App
