import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, login, signup } from '../api/auth'
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
interface AuthContextType {
  user?: iUser
  loading?: boolean
  error?: any
  logIn: (email: string, password: string) => void
  signUp: (email: string, name: string, password: string) => void
  logout: () => void
  refetchUser: () => void
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const [user, setUser] = useState<iUser | any>()
  const [error, setError] = useState<any>('')
  const [loading, setLoading] = useState<boolean>(true)
  const navigate = useNavigate()
  const { data, refetch } = useQuery('main', () => getCurrentUser(), {})

  useEffect(() => {
    if (error) setError(null)
  }, [])
  useEffect(() => {
    if (user !== undefined) {
      setLoading(false)
    }
  }, [])
  useEffect(() => {
    if (data !== undefined) {
      setUser(data.data.data[0])
    }
  }, [data, refetch])

  function logIn(email: string, password: string) {
    setError('')
    setLoading(true)
    login({ email, password }).then((user: any) => {
      if (user.status === 200) {
        if (user !== undefined) {
          setUser(user.user)
        }
        document.cookie = user.authToken
        navigate('/')
      } else {
        setError(user.message)
        setTimeout(() => setError(''), 2000)
      }
    })
  }

  function refetchUser() {
    refetch()
  }

  function signUp(email: string, name: string, password: string) {
    setError('')
    // setLoading(true)
    signup({ email, name, password }).then((user: any) => {
      if (user.status === 200) {
        login({ email, password }).then((user) => {
          if (user !== undefined) {
            setUser(user.user)
          }
          document.cookie = user.authToken
          navigate('/')
        })
      } else {
        setError(user.message)
        setTimeout(() => setError(''), 2000)
      }
    })
  }

  function logout() {
    setUser(null)
    document.cookie = '0'
    navigate('/login')
  }

  const memoedValue = useMemo(
    () => ({
      user,
      error,
      loading,
      logIn,
      signUp,
      logout,
      refetchUser,
    }),
    [user, error, loading, refetchUser],
  )

  return <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
}

export default function useAuth() {
  return useContext(AuthContext)
}
