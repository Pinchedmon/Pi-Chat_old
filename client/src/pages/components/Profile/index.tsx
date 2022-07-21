import React, { useEffect, useRef } from 'react'
import useAuth from '../../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import FilesUploadComponent from './FilesUploadComponent/FilesUploadComponent'
import { getPath } from '../../../api/session'
import { useQuery } from 'react-query'

const Profile = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()
  let user: any
  let name: any
  if (localStorage['user']) {
    user = JSON.parse(localStorage.getItem('user') || '')
    name = user.user.name
  }
  const img = useRef(user.user.Img)
  const { data } = useQuery('post', () => getPath(name), {
    refetchInterval: 1000,
    refetchOnMount: true,
  })
  useEffect(() => {
    if (!user) navigate('/login')
    img.current = data
  }, [data, navigate, user])

  return (
    <div className='pt-100px ml-48px'>
      <img className='w-100px' src={img.current} alt='загружается...' />

      {user && (
        <p className='text-2xl text-green-600'>
          Hello <span className='font-bold '>{user.user.name}</span>
        </p>
      )}
      <FilesUploadComponent name={user.user.name} />
      <button
        className='w-54px rounded-md font-bold text-green-600 p-1px mt-6px text-lgh-20 text-center border-2 border-green-600'
        onClick={logout}
      >
        Logout
      </button>
    </div>
  )
}
export default Profile
