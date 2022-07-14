import React from 'react'
import useAuth from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'
export default function Profile() {
  const { logout } = useAuth()
  let user
  if (localStorage['user']) {
    user = JSON.parse(localStorage.getItem('user') || '')
  }
  if (!user) return <Navigate to='/login' />

  return (
    <div>
      {user && <p>Hello {user.user.name}</p>}
      <button type='button' onClick={logout}>
        Logout
      </button>
    </div>
  )
}
