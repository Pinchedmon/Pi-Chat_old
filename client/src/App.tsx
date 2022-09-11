import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { QueryClientProvider, QueryClient } from 'react-query'
import useAuth, { AuthProvider } from './hooks/useAuth'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'

interface iUser {
  id: number
  email: string
  pathImg: string
  name: string
  username: string
  info: string
  role: string
  backImg: string
}
export const UserContext = React.createContext<iUser>(null)
function AuthenticatedRoute(props: any) {
  const { user } = useAuth()
  if (!user && document.cookie === '0') return <Navigate to='/login' />
  return (
    <UserContext.Provider value={user}>
      <props.component />
    </UserContext.Provider>
  )
}
function App() {
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
