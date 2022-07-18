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
    <div className='flex flex-col pt-90px md:pt-96px '>
      {posts.map((item: any, index: any) => (
        <div
          key={index}
          className='w-90% md:w-2/3 flex flex-col self-center mb-16px rounded-2xl overflow-hidden md:max-w-3xl border-3 border-green-600 bg-white'
        >
          <div className='flex flex-col p-10px'>
            <div className='text-md md:text-lg font-bold'>{item.author}</div>
            <div className='break-all text-sm md:text-md'>{item.text}</div>
          </div>
          <div className='flex flex-row p-10px'>
            <button onClick={() => handleLike(user.user.id.toString(), item.ID, item.likes)} className=''>
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
          </div>
        </div>
      ))}
    </div>
  )
}
export default Posts
