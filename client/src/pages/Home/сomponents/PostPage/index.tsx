import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/solid'
import { getPost } from '../../../../api/get'
import Comments from './components/Comment'
import { postComment } from '../../../../api/post'
import { UserContext } from '../../../../App'
import SendField from '../../../../components/ux/SendField'
import { useQuery } from 'react-query'
import Post from '../Posts/components/Post'
import { Icomment } from './types/comment.interface'

const PostData = () => {
  let page = 1
  const navigate = useNavigate()
  const location = useLocation()
  const [comments, setComments] = useState<Array<Icomment>>()
  const user = useContext(UserContext)

  const { data, refetch } = useQuery('post', () =>
    getPost({ search: location.search, page, count: 5 }).then((res) => {
      if (res.status === 200) {
        if (page < 2) {
          setComments(res.data.comments)
        } else {
          setComments([...comments, ...res.data.comments])
        }
        return res
      }
    }),
  )
  return (
    <div className='flex flex-col w-full h-screen items-stretch'>
      {comments && (
        <>
          <div className='postPage-exit' onClick={() => navigate('/')}>
            <ArrowLeftIcon className='postPage-exit__icon' />
          </div>

          <div className='mb-7px '>
            <Post
              data={data.data.post}
              deletePost={function (x: number): void {
                throw new Error('Function not implemented.')
              }}
              likePost={function (id: number, likes: number): void {
                throw new Error('Function not implemented.')
              }}
            />
          </div>
          <div className='overflow-y-scroll grow '>
            <Comments data={comments} refetch={refetch} />
            {data.continue && (
              <div
                onClick={() => {
                  page++
                  refetch()
                }}
              >
                показать ещё
              </div>
            )}
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
