import React from 'react'
import axios from 'axios'
import { getPosts } from '../../../api/getPosts'
import { XIcon } from '@heroicons/react/outline'

interface IPosts {
  data: any
  sort: string | number
  category: string
}
const Posts = (props: IPosts) => {
  let user: any, name: string
  if (localStorage['user']) {
    user = JSON.parse(localStorage.getItem('user') || '')
    name = user.user.name
  }
  const { sort, category, data } = props
  let posts = data
  const deleteButton = (id: number) => {
    axios.delete(`http://localhost:6060/feed?id=${id}`)
    getPosts({ sort, category })
  }
  const handleLike = (userId: string, id: number, likes: any) => {
    if (likes !== '0') {
      if (/\s/.test(likes)) {
        if (likes.split(' ').indexOf(userId) !== -1) {
          axios.put(
            `http://localhost:6060/feed?id=${id}&likes='${likes
              .split(' ')
              .splice(likes.split(' ').indexOf(userId) + 1, 1)
              .join(' ')}' `,
          )
        } else {
          axios.put(`http://localhost:6060/feed?id=${id}&likes='${likes.split(' ').push(`${userId}`).join(' ')}' `)
        }
      } else {
        if (likes === userId) {
          axios.put(`http://localhost:6060/feed?id=${id}&likes="0"`)
        } else {
          axios.put(`http://localhost:6060/feed?id=${id}&likes='${likes + ` ${userId}`}' `)
        }
      }
    } else {
      axios.put(`http://localhost:6060/feed?id=${id}&likes='${userId}'`)
    }
  }

  return (
    <div className='flex justify-center  pt-40 md:pt-28 '>
      {posts.map((item: any, index: any) => (
        <div key={index} className='post w-3/4  shadow-md overflow-hidden md:max-w-3xl'>
          <div className='post__author text-md md:text-xl'>{item.author}</div>
          <div className='post__info text-sm md:text-lg'>{item.text}</div>
          <button onClick={() => handleLike(user.user.id.toString(), item.ID, item.likes)} className=''>
            {item.likes === '0' ? '0' : /\s/.test(item.likes) ? item.likes.split(' ').length : [item.likes].length}
          </button>

          {name !== undefined ? (
            name === item.author ? (
              <button onClick={() => deleteButton(item.ID)} className=''>
                <XIcon className='h-6 w-6 text-green-600' />
              </button>
            ) : (
              ''
            )
          ) : (
            ''
          )}
        </div>
      ))}
    </div>
  )
}
export default Posts
