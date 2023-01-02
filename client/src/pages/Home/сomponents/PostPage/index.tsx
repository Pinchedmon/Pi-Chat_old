import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/solid'
import { getPost } from '../../../../api/get'
import { postComment } from '../../../../api/post'
import { UserContext } from '../../../../App'
import SendField from '../../../../components/ux/SendField'
import { useQuery } from 'react-query'
import Post from '../Posts/components/Post'
import { Icomment } from './types/comment.interface'
import { useDispatch } from 'react-redux'
import { setIsMenuShowed } from '../../../../state/navReducer'
import Comments from './components/Comments'

const PostData = () => {
  let page = 1
  const navigate = useNavigate()
  const location = useLocation()
  const [comments, setComments] = useState<Array<Icomment>>()
  const [post, setPost] = useState([{ name: '', ID: 0 }])
  const user = useContext(UserContext)
  const dispatch = useDispatch()
  const { data, refetch } = useQuery(['post'], () =>
    getPost({ search: location.search, page, count: 5 }).then((res) => {
      if (res.status === 200) {
        if (page < 2) {
          setComments(res.data.comments)
          setPost(res.data.post)
        } else {
          setComments([...comments, ...res.data.comments])
          setPost(res.data.post)
        }
        return res
      }
      if (res.status === 201) {
        window.alert('Вы были переадресованы с несуществующей страницы')
        navigate('/')
      }
    }),
  )
  const likeComment = (id: number, likes: number) => {
    setComments([
      ...comments,
      ...comments.filter((cmmt: Icomment) => {
        if (cmmt.ID === id) {
          cmmt.likes = likes
        }
      }),
    ])
  }
  return (
    <div className='flex flex-col w-full h-screen items-stretch'>
      {comments && (
        <>
          <div
            className='postPage-exit'
            onClick={() => {
              navigate('/')
              dispatch(setIsMenuShowed(true))
            }}
          >
            <ArrowLeftIcon className='postPage-exit__icon' />
          </div>

          <div className='mb-7px '>
            <Post data={post} deletePost={() => refetch()} likePost={() => refetch()} />
          </div>
          <div className='overflow-y-scroll grow '>
            <Comments
              postId={post[0].ID}
              name={user.name}
              data={comments}
              refetch={refetch}
              likeComment={likeComment}
            />
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
