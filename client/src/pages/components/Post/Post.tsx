/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { likeHandler, likeHandlerCom } from '../../../api/likeHandler'
import { ArrowLeftIcon, AnnotationIcon, ThumbUpIcon } from '@heroicons/react/outline'
import { useQuery } from 'react-query'
import TextareaAutosize from 'react-textarea-autosize'
import { postComment } from '../../../api/session'
const Post = () => {
  let user: any, name: string, userImg: string
  if (localStorage['user']) {
    user = JSON.parse(localStorage.getItem('user') || '')
    name = user.user.name
    userImg = user.user.img
  }
  const navigate = useNavigate()
  const location = useLocation()
  const [post, setPost] = useState<any>()
  const [img, setImg] = useState('')
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
    axios.put(`http://localhost:6060/post?id=${post.ID}&comments=${Number(post.comments) + 1}`)
    postComment({ id: post.ID, author: name, text: text, userImg: userImg })
    setText('')
    event.preventDefault()
  }
  const getPost = async () => {
    const response = await axios.get(`http://localhost:6060/post${location.search}`)
    // let file = await axios.get('http://localhost:6060/image')
    setImg(response.data.image)
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
      <div className='fixed mt-10px md:mt-16px ml-24px md:10% ' onClick={() => navigate('/')}>
        <ArrowLeftIcon className='w-48px text-green-600 rounded-md bg-gray-100 p-6px hover:bg-green-600 hover:text-white' />
      </div>
      {post !== undefined && (
        <div>
          <img className=' top-1px  w-full h-120px object-cover hover:object-scale-down ' alt='' src={img} />
          <div className='w-full md:w-2/3 md:max-w-3xl ml-auto mr-auto  '>
            <div className=' border-4 border-green-600 rounded-smoverflow-hidden  bg-white mb-10px '>
              <div className='flex flex-col pt-10px pl-10px pr-10px pb-4px'>
                <div className='text-xl p-10px md:text-2xl text-green-900 text-center font-bold'>{post.author}</div>
                <div className='break-all text-lg text-green-900 text-center  '>{post.text}</div>
              </div>
              <div className='flex flex-row ml-10px pb-8px'>
                <button className='flex ' onClick={() => likeHandler(user.user.id.toString(), post.ID, post.likes)}>
                  <span className='text-green-600 text-xl font-bold ml-6px pb-4px p-4px'>
                    {post.likes === '0'
                      ? '0'
                      : /\s/.test(post.likes)
                      ? post.likes.split(' ').length
                      : [post.likes].length}
                  </span>
                  <ThumbUpIcon className='text-green-600 w-32px' />
                </button>
                <button className='flex ml-auto mr-16px cursor-default'>
                  <AnnotationIcon className='w-32px pt-2px text-green-600' />
                  <span className='text-green-600 text-xl font-bold ml-6px pb-4px p-4px'>{post.comments}</span>
                </button>
              </div>
            </div>
          </div>
          <div className='w-full md:w-2/3 md:max-w-3xl ml-auto mr-auto rounded-2xl overflow-hidden  mb-16px bg-white '>
            {' '}
            {post.comments == 0 ? (
              <div className='p-12px text-center text-gray-400'>Нет комментариев</div>
            ) : (
              <div>
                {comments !== undefined &&
                  comments.map((item: { ID: number; author: string; text: string; likes: string; userImg: string }) => (
                    <div>
                      <div className='flex items-center pl-8px pt-8px'>
                        <img className='w-54px h-54px' src={item.userImg} alt='' />
                        <div className='ml-12px font-bold text-lg text-green-900'>{item.author}</div>
                      </div>
                      <div className='ml-16px text-lg text-green-900'>{item.text}</div>
                      <div>
                        <button
                          className='flex  p-8px '
                          onClick={() => likeHandlerCom(user.user.id.toString(), item.ID, item.likes)}
                        >
                          <span className='text-green-600 text-xl font-bold ml-6px pb-4px p-4px'>
                            {item.likes === '0'
                              ? '0'
                              : /\s/.test(item.likes)
                              ? item.likes.split(' ').length
                              : [item.likes].length}
                          </span>
                          <ThumbUpIcon className='text-green-600 w-32px' />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
          <form className='w-full md:w-2/3 md:max-w-3xl ml-auto mr-auto mb-54px' onSubmit={handleSubmit}>
            <TextareaAutosize
              cacheMeasurements
              onChange={(e) => handleChangeText(e)}
              value={text}
              className='w-full text-green-700 rounded-2xl resize-none outline-none pt-16px pb-16px pl-16px pr-16px'
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
