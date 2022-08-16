import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, AnnotationIcon, HeartIcon, PaperClipIcon } from '@heroicons/react/solid'
import TextareaAutosize from 'react-textarea-autosize'
import { postComment } from '../../../../api/session'
import useAuth from '../../../../hooks/useAuth'
import CPost from '../../../../components/CPost'
import { getPost } from '../../../../api/getPosts'
import CComments from '../../../../components/CComments'
import Buttons from './Buttons'
const Post = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  const name = user.user.name
  return (
    <>
      <div className='border-b-2 border-gray-300 p-16px ' onClick={() => navigate('/')}>
        <ArrowLeftIcon className='w-48px text-green-600 rounded-md bg-gray-100 p-6px hover:bg-green-600 hover:text-white' />
      </div>
      <div className='flex flex-col mt-16px '>
        <CPost getPost={getPost} naming={'post'} getObject={{ search: location.search }} />
        <CComments name={user.user.name} getObject={{ search: location.search }} role={user.user.role} />
        <Buttons id={location.search.replace(/[^0-9]/g, '')} />
      </div>
    </>
  )
}

export default Post
