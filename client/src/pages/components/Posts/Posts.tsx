import React, { useState } from 'react'
import axios from 'axios'
import { getPosts } from '../../../api/getPosts'
import { XIcon } from '@heroicons/react/outline'
import { likeHandler } from '../../../api/likeHandler'
import { useNavigate } from 'react-router-dom'
import { getPath } from '../../../api/session'
interface IPosts {
  data: any
  sort: string | number
  category: string
}
const Posts = (props: IPosts) => {
  let navigate = useNavigate()
  let user: any, name: string
  if (localStorage['user']) {
    user = JSON.parse(localStorage.getItem('user') || '')
    name = user.user.name
  }
  const { sort, category } = props
  let posts = props.data
  const deleteButton = (id: number) => {
    axios.delete(`http://localhost:6060/feed?id=${id}`)
    getPosts({ sort, category })
  }

  const showComments = async (id: number) => {
    navigate(`/post?id=${id}`)
  }
  return (
    <div className='flex flex-col pt-90px md:pt-96px '>
      {posts.map((item: any, index: any) => (
        <div
          key={index}
          className='w-90% md:w-2/3 flex flex-col self-center mb-16px rounded-2xl overflow-hidden md:max-w-3xl border-3 border-green-600 bg-white'
        >
          <img className=' w-300px' src={item.userImg} alt=' ' />
          <div className='flex flex-col pt-10px pl-10px pr-10px pb-4px'>
            <div className='text-lg md:text-xl font-bold'>{item.author}</div>
            <div className='break-all text-md'>{item.text}</div>
          </div>
          <div className='flex flex-row ml-10px pb-4px'>
            <button onClick={() => likeHandler(user.user.id.toString(), item.ID, item.likes)} className=''>
              {item.likes === '0' ? '0' : /\s/.test(item.likes) ? item.likes.split(' ').length : [item.likes].length}
            </button>
            {name !== undefined ? (
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
            <button onClick={() => showComments(item.ID)}>Комментарии {item.comments}</button>
          </div>
        </div>
      ))}
    </div>
  )
}
export default Posts
