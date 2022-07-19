/* eslint-disable eqeqeq */
import React, { useState, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { likeHandler } from '../../../api/likeHandler'

export const Post = () => {
  let user: any, name: string
  if (localStorage['user']) {
    user = JSON.parse(localStorage.getItem('user') || '')
    name = user.user.name
  }
  const location = useLocation()
  const [post, setPost] = useState<any>()
  const [text, setText] = useState('')
  const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)
  const handleSubmit = () => {
    axios.post(`http://localhost:6060/feed/comments?id=${post.ID}&author=${name}&text=${text}`)
  }

  const getPost = async () => {
    const response = await axios.get(`http://localhost:6060/post${location.search}`)
    setPost(response.data.data[0])
  }
  useEffect(() => {
    getPost()
  }, [])
  return (
    <>
      {post !== undefined && (
        <div className='pt-100px w-90% md:w-2/3 md:max-w-3xl ml-auto mr-auto '>
          <div className='rounded-2xl overflow-hidden  border-3 border-green-600 bg-white mb-10px '>
            <div className='flex flex-col pt-10px pl-10px pr-10px pb-4px'>
              <div className='text-lg md:text-xl font-bold'>{post.author}</div>
              <div className='break-all text-md '>{post.text}</div>
            </div>
            <div className='flex flex-row ml-10px pb-4px'>
              <button onClick={() => likeHandler(user.user.id.toString(), post.ID, post.likes)} className=''>
                {post.likes === '0' ? '0' : /\s/.test(post.likes) ? post.likes.split(' ').length : [post.likes].length}
              </button>

              <button>Комментарии {post.comments}</button>
            </div>
          </div>
          <div className='rounded-2xl overflow-hidden  border-3 border-green-600 mb-12px bg-white '>
            {' '}
            {post.comments == 0 && <div className='p-10px text-center text-gray-400'>Нет комментариев</div>}
          </div>
          <div className='overflow-hidden   '>
            <form onSubmit={handleSubmit}>
              <textarea
                onChange={(e) => handleChangeText(e)}
                value={text}
                className='w-full rounded-2xl  h-100px outline-none p-10px'
                placeholder='Написать комментарий'
              ></textarea>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
