import React, { useEffect, useRef } from 'react'
import useAuth from '../../../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import FilesUploadComponent from './FilesUploadComponent'
import { ArrowLeftIcon } from '@heroicons/react/outline'
import { useQuery } from 'react-query'
import { getPath } from '../../../../api/session'
const Profile = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
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
      <div className='border-b-2 border-gray-300 p-16px ' onClick={() => navigate('/')}>
        <ArrowLeftIcon className='w-48px text-green-600 rounded-md bg-gray-100 p-6px hover:bg-green-600 hover:text-white' />
      </div>
      <div className='w-full flex mt-16px self-center mb-16px'>
        <img className='ml-24px mr-16px h-100px rounded-xl w-100px' src={img.current} alt='загружается...' />

        <div className='flex flex-col'>
          <div className='flex items-center align-center  -mt-6px'>
            <div className='text-lg md:text-xl  font-bold'>{name}</div>
            <p className='ml-8px font-bold text-md text-gray-500'>@Псевдоимя</p>
          </div>
          <div className='float-right w-300px border-3 border-green-600  rounded-xl p-16px border-dashed bg-white'>
            <FilesUploadComponent name={name} />
          </div>
        </div>

        {/* <button
          className='w-100px bg-white p-6px rounded-md font-bold text-green-600  mt-6px  text-center border-2 border-green-600'
          onClick={logout}
        >
          Выйти
        </button> */}
      </div>
    </div>
  )
}
export default Profile
