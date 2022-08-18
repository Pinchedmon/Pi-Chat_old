import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import * as sessionsApi from '../api/session'
import * as usersApi from '../api/users'

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
  login: (email: string, password: string) => void
  signUp: (email: string, name: string, password: string) => void
  logout: () => void
  refetchUser: () => void
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const [user, setUser] = useState<iUser | any>()
  const [error, setError] = useState<any>('')
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const { data } = useQuery('main', () => usersApi.getCurrentUser(), {})

  useEffect(() => {
    if (error) setError(null)
  }, [])

  useEffect(() => {
    // usersApi.getCurrentUser().then((res) => {
    //   if (res.status === 200) {
    //     setUser(res.data)
    //   }
    // })

    if (data !== undefined) {
      setUser(data.data.data[0])
    }
  }, [data])

  function login(email: string, password: string) {
    setError('')
    // setLoading(true)
    sessionsApi.login({ email, password }).then((user: any) => {
      if (user.status === 200) {
        setUser(user)
        document.cookie = user.authToken
        navigate('/')
      } else {
        setError(user.message)
        setTimeout(() => setError(''), 2000)
      }
    })
  }

  function refetchUser() {
    // refetch()
  }

  function signUp(email: string, name: string, password: string) {
    setError('')
    // setLoading(true)
    usersApi.signUp({ email, name, password }).then((user: any) => {
      if (user.status === 200) {
        sessionsApi.login({ email, password }).then((user) => {
          setUser(user)
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
    sessionsApi.logout()
    setUser(null)
    document.cookie = '0'
    navigate('/login')
  }

  const memoedValue = useMemo(
    () => ({
      user,
      error,
      loading,
      login,
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
