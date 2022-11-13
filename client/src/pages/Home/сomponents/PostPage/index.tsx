import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/solid'
import { getPost } from '../../../../api/get'
import Comments from './components/Comment'
import { postComment } from '../../../../api/post'
import { UserContext } from '../../../../App'
import SendField from '../../../../components/ux/SendField'
import { useQuery } from 'react-query'
import InfiniteScroll from 'react-infinite-scroll-component'
import Post from '../Posts/components/Post'
import { Icomment } from './types/comment.interface'

const PostData = () => {
  let page = 1
  const navigate = useNavigate()
  const location = useLocation()
  const [comments, setComments] = useState<Array<Icomment>>()
  const user = useContext(UserContext)
  const { data, refetch } = useQuery('post', () =>
    getPost({ search: location.search, page }).then((res) => {
      if (res.status === 200) {
        if (page < 2) {
          setComments(res.data.comments)
        } else {
          setComments([...comments, ...res.data.comments])
        }
        return res.data
      }
    }),
  )
  return (
    <>
      {comments && (
        <>
          <div className='postPage-exit' onClick={() => navigate('/')}>
            <ArrowLeftIcon className='postPage-exit__icon' />
          </div>
          <div className='flex flex-col'>
            <Post data={data && data.post} refetch={refetch} />
            <div className='overflow-y-auto h-auto flex-initial grow '>
              {/* <InfiniteScroll
                next={() => {
                  page++
                  refetch()
                }}
                hasMore={true}
                loader={'424232'}
                dataLength={comments.length}
              > */}
              <Comments data={comments} refetch={refetch} />
              {/* </InfiniteScroll> */}
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
    </>
  )
}

export default PostData
