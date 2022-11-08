import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, login, signup } from '../api/auth'
import { Iuser } from '../types/user.interface'
import { IauthContextType } from './types/authContextType.interface'
import { IsignUpProps } from './types/signUpProps.interface'

const AuthContext = createContext<IauthContextType>({} as IauthContextType)

export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const [user, setUser] = useState<Iuser>()
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const navigate = useNavigate()
  const { refetch } = useQuery(
    'main',
    () =>
      getCurrentUser().then((res: any) => {
        if (res.status === 200) {
          setUser(res.data)
          return res.data
        }
      }),
    {},
  )

  useEffect(() => {
    if (error) setError(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if (user !== undefined) {
      setLoading(false)
    }
    // eslint-disable-next-line  react-hooks/exhaustive-deps
  }, [])
  // useEffect(() => {
  //   if (data !== undefined) {
  //     setUser(data.data[0])
  //   }
  // }, [data])

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

  function signUp(props: IsignUpProps) {
    const { email, name, password } = props
    setError('')
    // setLoading(true)
    signup({ email, name, password }).then((data) => {
      if (data.status === 200) {
        login({ email, password }).then((user) => {
          if (user !== undefined) {
            setUser(user.user)
          }
          document.cookie = user.authToken
          navigate('/')
        })
      } else {
        setError(data.message)
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
    [user, error, loading],
  )

  return <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
}

export default function useAuth() {
  return useContext(AuthContext)
}
