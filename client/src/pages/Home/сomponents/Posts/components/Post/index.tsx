import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/solid'
import useAuth from '../../../../../../hooks/useAuth'
import { getPost } from '../../../../../../api/get'
import CComments from './components/CommentData'
import { postComment } from '../../../../../../api/post'
import PostData from './components/PostData'
import SendField from '../../../../../../components/ui/SendField'

const Post = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()

  return (
    <>
      <div className='border-b-2 border-gray-300 p-16px ' onClick={() => navigate('/')}>
        <ArrowLeftIcon className='w-48px text-green-600 rounded-md bg-gray-100 p-6px hover:bg-green-600 hover:text-white' />
      </div>
      <div className='flex flex-col mt-16px '>
        <PostData getPost={getPost} naming={'post'} getObject={{ search: location.search }} />
        <CComments name={user.name} getObject={{ search: location.search }} role={user.role} />
        <SendField id={location.search.replace(/[^0-9]/g, '')} postFunc={postComment} />
      </div>
    </>
  )
}

export default Post
