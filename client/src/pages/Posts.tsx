import React from 'react'
import axios from 'axios'
import { getPosts } from '../api/getPosts'
import { XIcon, AnnotationIcon, ThumbUpIcon } from '@heroicons/react/outline'
import { likeHandler } from '../api/likeHandler'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import useAuth from '../hooks/useAuth'
interface IPosts {
  data: any
  sort: string | number
  category: string
}
const Posts = (props: IPosts) => {
  let navigate = useNavigate()
  const { user } = useAuth()
  const name = user.user.name
  const { sort, category } = props

  let posts = props.data
  const { refetch } = useQuery('posts', () => getPosts({ sort, category }))
  const deleteButton = (id: number) => {
    axios.delete(`http://localhost:6060/feed?id=${id}`)
    getPosts({ sort, category })
    refetch()
  }
  const showComments = async (id: number) => {
    navigate(`/post?id=${id}`)
  }
  return (
    <div className='flex flex-col pt-90px md:pt-96px '>
      {posts.map((item: any, index: any) => (
        <div
          key={index}
          className=' w-90% flex flex-col self-center mb-16px rounded-2xl overflow-hidden md:max-w-3xl border-3 border-green-600 bg-white'
        >
          <img
            className='border-b-3 border-green-600 h-100px object-cover hover:object-scale-down'
            src={item.userImg}
            alt=' '
          />
          <div className='flex '>
            {item.postImg !== '' && (
              <img className='  w-100px  object-cover hover:object-scale-down' src={item.postImg} alt=' ' />
            )}
            <div className='flex w-full   flex-col pt-10px pl-10px pr-10px pb-4px'>
              <div className='text-lg md:text-xl text-green-900  font-bold'>{item.author}</div>
              <div className='break-all text-md text-green-900  '>{item.text}</div>
            </div>
          </div>

          <div className='flex flex-row ml-10px pb-4px'>
            {user.user.role !== 'ADMIN' ? (
              name === item.author ? (
                <button onClick={() => deleteButton(item.ID)} className=''>
                  <XIcon className='h-32px w-32px text-green-600' />
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
            <button
              className='flex '
              onClick={() => {
                likeHandler(user.user.id.toString(), item.ID, item.likes)
                refetch()
              }}
            >
              <span className='text-green-600 text-xl font-bold ml-6px pb-4px p-4px'>
                {item.likes === '0' ? '0' : /\s/.test(item.likes) ? item.likes.split(' ').length : [item.likes].length}
              </span>
              <ThumbUpIcon className='text-green-600 w-32px' />
            </button>

            <button className='flex ml-auto mr-16px ' onClick={() => showComments(item.ID)}>
              <AnnotationIcon className='w-32px pt-2px text-green-600' />
              <span className='text-green-600 text-xl font-bold ml-6px pb-4px p-4px'>{item.comments}</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
export default Posts
