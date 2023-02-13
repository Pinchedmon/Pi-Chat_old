import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/solid'
import { getPostComments, getPostInfo } from '../../../../api/get'
import { deleteNotify, postComment } from '../../../../api/post'
import { UserContext } from '../../../../App'
import SendField from '../../../../components/ux/SendField'
import Post from '../Posts/components/Post'
import { Icomment } from './types/comment.interface'
import { useDispatch } from 'react-redux'
import { setIsMenuShowed } from '../../../../state/navReducer'
import Comments from './components/Comments'
import { useQuery } from 'react-query'

const PostData = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [comments, setComments] = useState<Array<Icomment>>([])
  const user = useContext(UserContext)
  const [nextPage, setNextPage] = useState(1)
  const [next, setNext] = useState(true)
  const dispatch = useDispatch()
  const { data, refetch } = useQuery(['postInfo'], () =>
    getPostInfo({ id: Number(location.search.replace(/[^0-9]/g, '')), name: user.name }).then((res) => {
      if (res.status === 201) {
        window.alert('Вы были переадресованы с несуществующей страницы')
        deleteNotify(Number(location.search.replace(/[^0-9]/g, '')), 1)
        navigate('/')
      }
      return res.data
    }),
  )
  const fetchComments = async (page: number, count: number) => {
    getPostComments({
      id: Number(location.search.replace(/[^0-9]/g, '')),
      name: user.name,
      count: 10,
      page: page,
    }).then((res) => {
      if (res.status === 200) {
        setComments([...comments, ...res.data])
        setNextPage(res.page)
        setNext(res.continue)
      }
    })
  }

  const deletePost = (id: number) => {
    window.alert('Вы были переадресованы с несуществующей страницы')
    deleteNotify(Number(location.search.replace(/[^0-9]/g, '')), 1)
    navigate('/')
  }
  const handleFetchMore = () => {
    fetchComments(nextPage, 10)
  }
  const deleteComment = (id: number) => {
    setComments([...comments.filter((msg: Icomment) => msg.ID !== id)])
    refetch()
  }
  const addComment = (comment: Icomment) => {
    setComments([...comments, comment])
    refetch()
  }
  const likeComment = (id: number, likes: number) => {
    setComments([
      ...comments,
      ...comments.filter((msg: Icomment) => {
        if (msg.ID === id) {
          msg.likes = likes
        }
      }),
    ])
  }
  useEffect(() => {
    setComments([])
    fetchComments(nextPage, 10)
  }, [])

  return (
    <div className='flex flex-col w-full h-screen items-stretch'>
      {1 && (
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
            <Post data={data} deletePost={deletePost} likePost={() => refetch()} />
          </div>
          <div className='overflow-y-scroll grow '>
            <Comments
              postId={Number(location.search.replace(/[^0-9]/g, ''))}
              name={user.name}
              data={comments}
              deleteComment={deleteComment}
              addComment={addComment}
              likeComment={likeComment}
            />
            {next && (
              <div
                onClick={() => {
                  handleFetchMore()
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
              refetch: addComment,
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
