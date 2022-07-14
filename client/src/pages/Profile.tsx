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
    <div className='pt-36 ml-36'>
      {user && (
        <p className='text-2xl text-green-600'>
          Hello <span className='font-bold '>{user.user.name}</span>
        </p>
      )}
      <button
        className='w-54 rounded-md font-bold text-green-600 p-1 mt-6 text-lgh-20 text-center border-2 border-green-600'
        onClick={logout}
      >
        Logout
      </button>
    </div>
  )
}
