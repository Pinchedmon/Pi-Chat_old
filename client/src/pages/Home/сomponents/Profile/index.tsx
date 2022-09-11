import React from 'react'
import useAuth from '../../../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import FilesUploadComponent from './components/FilesUploadComponent'
import { getMyPosts } from '../../../../api/get'
import { ArrowLeftIcon } from '@heroicons/react/solid'
import EditName from './components/EditName'

import EditInfo from './components/EditInfo'
import { useQuery } from 'react-query'
import PostData from '../Posts/components/Post/components/PostData'
import EditBackground from './components/EditBackground'

const Profile = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  let name = user.name
  const { refetch } = useQuery('myPosts')
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
        <FilesUploadComponent fetchPosts={refetch} />
        <div className='flex w-full flex-col'>
          {/* naming  |  info*/}
          <div className='flex items-center align-center w-full  -mt-6px'>
            <EditName fetchPosts={refetch} />
            <p className='ml-8px font-bold text-md text-gray-500'>@{name}</p>
          </div>
          <EditInfo />
        </div>
      </div>
      {/* posts */}
      <div className='mt-16px'>
        <PostData getPost={getMyPosts} naming='myPosts' getObject={name} />
      </div>
    </div>
  )
}
export default Profile
