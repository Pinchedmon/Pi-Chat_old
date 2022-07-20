/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { likeHandler } from '../../../api/likeHandler'
import { useQuery } from 'react-query'
import TextareaAutosize from 'react-textarea-autosize'
import { postComment } from '../../../api/session'
const Post = () => {
  let user: any, name: string
  if (localStorage['user']) {
    user = JSON.parse(localStorage.getItem('user') || '')
    name = user.user.name
  }
  const location = useLocation()
  const [post, setPost] = useState<any>()
  const [comments, setComments] = useState<any>()
  const [text, setText] = useState('')
  const [textError, setTextError] = useState('Сообщение не может быть пустым')
  const [validForm, setValidForm] = useState(false)
  const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
    if (!e.target.value) {
      setTextError('Имя не может быть пустым')
    } else {
      setTextError('')
    }
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    axios.put(`http://localhost:6060/post?id=${post.ID}&comments=${post.comments + 1}`)
    postComment({ id: post.ID, author: name, text: text })
    setText('')
    event.preventDefault()
  }
  const getPost = async () => {
    const response = await axios.get(`http://localhost:6060/post${location.search}`)
    console.log(response)
    setPost(response.data.post[0])
    setComments(response.data.comments)
  }
  const { data } = useQuery('post', () => getPost(), {
    refetchInterval: 1000,
    refetchOnMount: true,
  })
  useEffect(() => {
    setPost(data)
  }, [data, setPost])
  useEffect(() => {
    if (textError) {
      setValidForm(false)
    } else {
      setValidForm(true)
    }
  }, [textError])
  return (
    <>
      {post !== undefined && (
        <div className='pt-100px w-90% md:w-2/3 md:max-w-3xl ml-auto mr-auto '>
          <div className='rounded-2xl overflow-hidden  border-3 border-green-600 bg-white mb-10px '>
            <div className='flex flex-col pt-10px pl-10px pr-10px pb-4px'>
              <div className='text-lg md:text-xl font-bold'>{post.author}</div>
              <div className='break-all text-md '>{post.text}</div>
            </div>
            <div className='flex flex-row ml-10px pb-8px'>
              <button onClick={() => likeHandler(user.user.id.toString(), post.ID, post.likes)} className=''>
                {post.likes === '0' ? '0' : /\s/.test(post.likes) ? post.likes.split(' ').length : [post.likes].length}
              </button>

              <button>Комментарии {post.comments}</button>
            </div>
          </div>
          <div className='rounded-2xl overflow-hidden  border-3 border-green-600 mb-16px bg-white '>
            {' '}
            {post.comments == 0 ? (
              <div className='p-12px text-center text-gray-400'>Нет комментариев</div>
            ) : (
              <div>
                {comments.map((item: { author: string; text: string; likes: string | number }) => (
                  <div>
                    <div>{item.author}</div>
                    <div>{item.text}</div>
                    <div>{item.likes}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <form className='' onSubmit={handleSubmit}>
            <TextareaAutosize
              cacheMeasurements
              onChange={(e) => handleChangeText(e)}
              value={text}
              className='w-full rounded-2xl resize-none outline-none pt-16px pb-16px pl-16px pr-16px'
              placeholder='Написать комментарий'
            />
            <button
              disabled={!validForm}
              className='float-right bg-green-600 text-white pt-6px pb-6px pl-16px pr-16px rounded-xl'
            >
              Отправить
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default Post
