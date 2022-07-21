import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as sessionsApi from '../api/session'
import * as usersApi from '../api/users'

interface AuthContextType {
  user?: string
  loading?: boolean
  error?: any
  login: (email: string, password: string) => void
  signUp: (email: string, name: string, password: string) => void
  logout: () => void
}
const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const [user, setUser] = useState<any>()
  const [error, setError] = useState<any>('')
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  useEffect(() => {
    if (error) setError(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    usersApi.getCurrentUser().then((user) => setUser(user))
  }, [])

  function login(email: string, password: string) {
    setError('')
    setLoading(true)
    sessionsApi.login({ email, password }).then((user: any) => {
      if (user.status === 200) {
        setUser(user.user)
        localStorage.setItem('user', JSON.stringify(user))
        navigate('/')
      } else {
        setError(user.message)
        setTimeout(() => setError(''), 2000)
      }
    })
  }
  function signUp(email: string, name: string, password: string) {
    setError('')
    setLoading(true)
    usersApi.signUp({ email, name, password }).then((user: any) => {
      if (user.status === 200) {
        sessionsApi.login({ email, password }).then((user) => {
          setUser(user.user)
          localStorage.setItem('user', JSON.stringify(user))
          navigate('/')
        })
      } else {
        setError(user.message)
        setTimeout(() => setError(''), 2000)
      }
    })
  }

  function logout() {
    sessionsApi.logout()
    navigate('/')
  }
  const memoedValue = useMemo(
    () => ({
      user,
      error,
      loading,
      login,
      signUp,
      logout,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, error, loading],
  )
  return <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
}

export default function useAuth() {
  return useContext(AuthContext)
}
