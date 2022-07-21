import React, { useEffect, useRef } from 'react'
import useAuth from '../../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import FilesUploadComponent from './FilesUploadComponent/FilesUploadComponent'
import { getPath } from '../../../api/session'
import { useQuery } from 'react-query'
import { ArrowLeftIcon } from '@heroicons/react/outline'
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
    <div>
      <div className='fixed mt-10px md:mt-16px ml-24px md:ml-10% ' onClick={() => navigate('/')}>
        <ArrowLeftIcon className='w-48px text-green-600 rounded-md bg-gray-100 p-6px hover:bg-green-600 hover:text-white' />
      </div>
      <div className='flex flex-col h-screen mt-10% items-center'>
        <div className=' mb-10px float-right w-300px bg-white border-3 border-green-600  rounded-xl p-16px'>
          {' '}
          {user && (
            <p className='text-2xl text-green-600'>
              Привет <span className='font-bold '>{user.user.name}</span>
            </p>
          )}
        </div>
        <div className='flex flex-col '>
          <div className='float-right w-300px border-3 border-green-600  rounded-xl p-16px border-dashed bg-white'>
            <img className='w-100px' src={img.current} alt='загружается...' />
            <FilesUploadComponent name={user.user.name} />
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
