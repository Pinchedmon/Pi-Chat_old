import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/solid'
import { getPost } from '../../../../api/get'
import CComments from './components/CommentData'
import { postComment } from '../../../../api/post'
import { UserContext } from '../../../../App'
import SendField from '../../../../components/ux/SendField'
import { useQuery } from 'react-query'
import Post from '../../../../components/ui/Post'
import InfiniteScroll from 'react-infinite-scroll-component'

const PostData = () => {
  const navigate = useNavigate()
  const location = useLocation()
  let page = 1
  const [comments, setComments] = useState<Array<any>>([{}])
  const user = useContext(UserContext)
  const { data, refetch } = useQuery('post', () =>
    getPost({ search: location.search, page }).then((res: any) => {
      if (res.status === 200) {
        if (page < 2) {
          page++
          setComments(res.data.comments)
        } else {
          setComments([...comments, ...res.data.comments])
        }
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
            <InfiniteScroll
              next={() => {
                console.log(page)
                refetch()
              }}
              hasMore={true}
              loader={'424232'}
              dataLength={comments.length}
            >
              <div className='mt-16px'>
                <Post data={data.post} refetch={refetch} />
                <CComments data={comments} refetch={refetch} />
              </div>
            </InfiniteScroll>
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

export default PostData
