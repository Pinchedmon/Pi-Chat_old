import React, { useEffect, useRef } from 'react'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import FilesUploadComponent from './components/Profile/FilesUploadComponent/FilesUploadComponent'

import { ArrowLeftIcon } from '@heroicons/react/outline'
import { useQuery } from 'react-query'
import { getPath } from '../api/session'
const Profile = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const img = useRef(user.user.img)
  let name = user.user.name
  const { data, refetch } = useQuery('profile', () => getPath(name))
  useEffect(() => {
    img.current = data
    user.user.img = data
    refetch()
  }, [data, refetch, user.user])
  useEffect(() => {
    if (!user) navigate('/login')
  }, [navigate, user])

  return (
    <div>
      <div className='fixed mt-10px md:mt-16px ml-24px md:ml-10% ' onClick={() => navigate('/')}>
        <ArrowLeftIcon className='w-48px text-green-600 rounded-md bg-gray-100 p-6px hover:bg-green-600 hover:text-white' />
      </div>
      <div className='flex flex-col h-screen mt-10% items-center'>
        <div className=' mb-10px float-right w-300px bg-white border-3 border-green-600  rounded-xl p-16px'>
          <p className='text-2xl text-green-600'>
            Вы: <span className='font-bold '>{user.user.name}</span>
          </p>
        </div>
        <div className='flex flex-col '>
          <div className='float-right w-300px border-3 border-green-600  rounded-xl p-16px border-dashed bg-white'>
            <img className='w-100px' src={img.current} alt='загружается...' />
            <FilesUploadComponent name={name} />
          </div>
        </div>
        <button
          className='w-100px bg-white p-6px rounded-md font-bold text-green-600  mt-6px  text-center border-2 border-green-600'
          onClick={logout}
        >
          Выйти
        </button>
      </div>
    </div>
  )
}
export default Profile
