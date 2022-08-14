import { HeartIcon, XIcon, AnnotationIcon } from '@heroicons/react/solid'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import redaxios from 'redaxios'
import useAuth from '../hooks/useAuth'

type iPost = {
  userImg: string
  author: string
  username: string
  text: string
  postImg: string
  likes: number | string
  ID: number
  comments: number | string
}
function CPost(props: { getPost: (getObject: any) => Promise<any>; naming: string; getObject: any }) {
  const { getPost, naming, getObject } = props
  const [posts, setPosts] = useState([])
  const navigate = useNavigate()
  const { user } = useAuth()
  let name = user.user.name

  const deleteButton = (id: number) => {
    redaxios.delete(`http://localhost:6060/posts/feed?id=${id}`).then((res) => {
      if (res.status === 200) {
        refetch()
      }
    })
  }
  const { data, refetch } = useQuery(naming, () => getPost(getObject), {})
  useEffect(() => {
    setPosts(data)
  }, [data])

  const showComments = async (id: number) => {
    navigate(`/post?id=${id}`)
  }
  return (
    <div>
      {posts !== undefined &&
        posts.map((item: iPost, index: string | number) => (
          <div key={index} className='w-full flex  self-center mb-16px border-b-2 border-gray-300'>
            <img className='ml-24px mr-16px h-54px rounded-xl w-54px' src={item.userImg} alt=' ' />

            <div className='flex flex-col'>
              <div className='flex items-center align-center  -mt-6px'>
                <div className='text-lg md:text-xl  font-bold'>{item.username}</div>
                <p className='ml-8px font-bold text-md text-gray-500'>@{item.author}</p>
                <p className='ml-8px font-bold text-md text-gray-500'>24ч</p>
              </div>
              <div
                className='break-all text-md
            pt-4px
            pb-12px'
              >
                {item.text}
              </div>
              {item.postImg !== '' && <img className='w-1/2 rounded-xl' src={item.postImg} alt=' ' />}
              <div className='mt-8px mb-8px flex flex-row items-center'>
                <button
                  className='flex '
                  onClick={() => {
                    redaxios
                      .put(`http://localhost:6060/posts/feed?postId=${item.ID}&profileName=${name}`)
                      .then((response) => {
                        if (response.status === 200) {
                          refetch()
                        }
                      })
                  }}
                >
                  <HeartIcon className='text-green-600 w-28px' />
                  <span className='text-green-600 text-lg font-bold ml-6px'>{item.likes}</span>
                </button>

                <button className='flex items-center ml-16px' onClick={() => showComments(item.ID)}>
                  <AnnotationIcon className='w-28px h-28x  text-green-600' />
                  <span className='text-green-600 text-lg font-bold pb-4px p-4px'>{item.comments}</span>
                </button>
                {user.user.role !== 'ADMIN' ? (
                  name === item.author ? (
                    <button onClick={() => deleteButton(item.ID)} className=''>
                      <XIcon className='h-24px w-24px text-green-600' />
                    </button>
                  ) : (
                    ''
                  )
                ) : (
                  ''
                )}
                {user.user.role === 'ADMIN' && (
                  <button onClick={() => deleteButton(item.ID)} className=''>
                    <XIcon className='h-32px w-32px text-green-600' />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

export default CPost
