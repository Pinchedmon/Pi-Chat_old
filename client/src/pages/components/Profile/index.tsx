import React, { useEffect } from 'react'
import useAuth from '../../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
export default function Profile() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  let user: any
  if (localStorage['user']) {
    user = JSON.parse(localStorage.getItem('user') || '')
  }
  useEffect(() => {
    if (!user) navigate('/login')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <div className='pt-100px ml-48px'>
      {user && (
        <p className='text-2xl text-green-600'>
          Hello <span className='font-bold '>{user.user.name}</span>
        </p>
      )}
      <button
        className='w-54px rounded-md font-bold text-green-600 p-1px mt-6px text-lgh-20 text-center border-2 border-green-600'
        onClick={logout}
      >
        Logout
      </button>
    </div>
  )
}
