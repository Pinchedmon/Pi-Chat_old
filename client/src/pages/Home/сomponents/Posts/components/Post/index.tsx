import React, { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/solid'
import { getPost } from '../../../../../../api/get'
import CComments from './components/CommentData'
import { postComment } from '../../../../../../api/post'
import PostData from './components/PostData'
import { UserContext } from '../../../../../../App'
import SendField from '../../../../../../components/ux/SendField'
import { useQuery } from 'react-query'

const Post = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const user = useContext(UserContext)
  const { data, refetch } = useQuery('post', () =>
    getPost({ search: location.search }).then((res: any) => {
      if (res.status === 200) {
        return res.data
      }
    }),
  )
  return (
    <div className='flex flex-col w-full h-screen items-stretch'>
      {data !== undefined && (
        <>
          <div className='border-b-2 border-gray-300 p-16px' onClick={() => navigate('/')}>
            <ArrowLeftIcon className='w-48px text-green-600 rounded-md bg-gray-100 p-6px hover:bg-green-600 hover:text-white' />
          </div>
          <div className='overflow-y-scroll h-full'>
            <div className='mt-16px'>
              <PostData data={data.post} refetch={refetch} />
              <CComments data={data.comments} refetch={refetch} />
            </div>
          </div>
          <SendField
            postFuncProps={{
              id: location.search.replace(/[^0-9]/g, ''),
              name: user.name,
              refetch: refetch,
            }}
            postFunc={postComment}
            object='comment'
          />
        </>
      )}
    </div>
  )
}

export default Post
