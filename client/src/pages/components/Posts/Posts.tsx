import React from 'react'
import redaxios from 'redaxios'
import { getPosts } from '../../../api/getPosts'
import { XIcon, AnnotationIcon, HeartIcon } from '@heroicons/react/solid'
import { likeHandler } from '../../../api/likeHandler'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import useAuth from '../../../hooks/useAuth'
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
    redaxios.delete(`http://localhost:6060/feed?id=${id}`)
    getPosts({ sort, category })
    refetch()
  }
  const showComments = async (id: number) => {
    navigate(`/post?id=${id}`)
  }
  return (
    <div className='flex flex-col mt-16px '>
      {posts.map((item: any, index: any) => (
        <div key={index} className='w-full flex  self-center mb-16px border-b-2 border-gray-100'>
          <img className='ml-24px mr-16px h-54px rounded-xl w-54px' src={item.userImg} alt=' ' />

          <div className='flex flex-col'>
            <div className='flex items-center align-center  -mt-6px'>
              <div className='text-lg md:text-xl  font-bold'>{item.author}</div>
              <p className='ml-8px font-bold text-md text-gray-500'>@Псевдоимя</p>
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
                  likeHandler(user.user.id.toString(), item.ID, item.likes)
                  refetch()
                }}
              >
                <HeartIcon className='text-green-600 w-28px' />
                <span className='text-green-600 text-lg font-bold ml-6px'>
                  {item.likes === '0'
                    ? '0'
                    : /\s/.test(item.likes)
                    ? item.likes.split(' ').length
                    : [item.likes].length}
                </span>
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
export default Posts
