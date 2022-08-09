import React, { useEffect } from 'react'
import useAuth from '../../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import FilesUploadComponent from './FilesUploadComponent/FilesUploadComponent'
import { getMyPosts } from '../../../api/session'
import { ArrowLeftIcon, PencilIcon } from '@heroicons/react/solid'
import CPost from '../../../components/CPost'
import EditBackground from './FilesUploadComponent/EditBackground'

const Profile = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  let name = user.user.name

  return (
    <div>
      {/* exit */}
      <div className='border-b-2 border-gray-300 p-16px ' onClick={() => navigate('/')}>
        <ArrowLeftIcon className='w-48px text-green-600 rounded-md bg-gray-100 p-6px hover:bg-green-600 hover:text-white' />
      </div>
      {/* profile */}
      {/* background photo */}
      <EditBackground />
      {/* icon */}
      <div className='w-full flex mt-16px self-center border-b-2 border-gray-300 pb-16px'>
        <FilesUploadComponent />
        <div className='flex w-full flex-col'>
          {/* naming */}
          <div className='flex items-center align-center w-full  -mt-6px'>
            <div className='text-lg md:text-2xl  font-bold'>{name}</div>
            <PencilIcon className='ml-4px w-24px text-green-600' />
            <p className='ml-8px font-bold text-md text-gray-500'>@Псевдоимя</p>
          </div>
          <div className='flex'>
            <p>Описание о себе и всё такое </p>
            <PencilIcon className='ml-4px w-24px text-green-600' />
          </div>
        </div>
      </div>
      {/* posts */}
      <div className='mt-16px'>
        <CPost getPost={getMyPosts} naming='myPosts' getObject={name} />
      </div>
    </div>
  )
}
export default Profile
