import Feed from './pages/Feed'
import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { QueryClientProvider, QueryClient } from 'react-query'
import useAuth, { AuthProvider } from './hooks/useAuth'
import SignUp from './pages/SignUp'
import Login from './pages/Login'

function AuthenticatedRoute(props: any) {
  let { user } = useAuth()
  if (!user) return <Navigate to='/login' />
  console.log(user)
  return <props.component />
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
                  <AuthenticatedRoute component={() => <Feed />} />
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
            {/* <Route
              path='/post'
              element={
                <AuthProvider>
                  <AuthenticatedRoute component={() => <Post />} />
                </AuthProvider>
              }
            /> */}
            {/* <Route
              path='/profile'
              element={
                <AuthProvider>
                  <AuthenticatedRoute component={() => <Profile />} />
                </AuthProvider>
              }
            /> */}
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}
export default App
