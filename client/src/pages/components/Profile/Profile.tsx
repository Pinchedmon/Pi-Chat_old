import React from 'react'
import useAuth from '../../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import FilesUploadComponent from './FilesUploadComponent/FilesUploadComponent'
import { getMyPosts } from '../../../api/session'
import { ArrowLeftIcon, PencilIcon } from '@heroicons/react/solid'
import EditBackground from './FilesUploadComponent/EditBackground'
import EditText from './FilesUploadComponent/EditText'
import CPost from '../../../components/СPost'
import EditInfo from "./FilesUploadComponent/EditInfo";

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
            <EditText/>
            <p className='ml-8px font-bold text-md text-gray-500'>@{name}</p>
          </div>
           <EditInfo/>
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
