import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, login, signup } from '../api/auth'
import { Ilogin } from '../api/types/login.interface'
import { Isignup } from '../api/types/singup.interface'
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

  function logIn(email: string, password: string) {
    setError('')
    setLoading(true)
    //  { status: number; user: Iuser; authToken: string; message?: string }

    login({ email, password }).then((data: Ilogin) => {
      if (data.status === 200) {
        setUser(data.user)
        document.cookie = data.authToken
        navigate('/')
      } else {
        setError(data.message)
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

    signup({ email, name, password }).then((data: Isignup) => {
      if (data.status === 200) {
        setUser(data.user)
        document.cookie = data.authToken
        navigate('/')
      } else {
        setError(data.message)
        setTimeout(() => setError(''), 2000)
      }
    })
  }

  function logout() {
    setUser(null)
    document.cookie = ''
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
