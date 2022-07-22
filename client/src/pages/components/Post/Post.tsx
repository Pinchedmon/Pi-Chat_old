import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { likeHandler } from '../../../api/likeHandler'
import { ArrowLeftIcon, AnnotationIcon, ThumbUpIcon, PaperClipIcon, XIcon } from '@heroicons/react/outline'
import { useQuery } from 'react-query'
import TextareaAutosize from 'react-textarea-autosize'
import { getPath, postComment } from '../../../api/session'

const Post = () => {
  let user: any, name: string
  if (localStorage['user']) {
    user = JSON.parse(localStorage.getItem('user') || '')
    name = user.user.name
  }
  const navigate = useNavigate()
  const location = useLocation()
  const [path, setPath] = useState()
  const [post, setPost] = useState<any>()
  const [img, setImg] = useState('')
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState<string>()
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
  const handleChangeFile = (e: React.SyntheticEvent<any, Event>) => {
    const target = e.target as HTMLInputElement
    setFile(target.files[0])
    e.preventDefault()
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    axios.put(`http://localhost:6060/post?id=${post.ID}&comments=${Number(post.comments) + 1}`)
    const commentImg = new FormData()
    if (file !== null) {
      commentImg.append('comment', file)
    }
    postComment({ id: post.ID, author: name, text: text, userImg: path }, commentImg)
    setText('')
    setFile(null)
  }
  const getPost = async () => {
    const response = await axios.get(`http://localhost:6060/post${location.search}`)
    setImg(response.data.image)
    setPost(response.data.post[0])
    setComments(response.data.comments)
  }
  const handleDelete = (text: string, id: number) => {
    axios.delete(`http://localhost:6060/feed/comments?text=${text}&id=${id}`)
  }
  const { data } = useQuery('post', () => getPost(), {
    refetchInterval: 1000,
    refetchOnMount: true,
  })
  useEffect(() => {
    setPost(data)
  }, [data])

  useEffect(() => {
    getPath(name).then((res) => setPath(res))
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setPreview(null)
    }
    if (textError && file === null) {
      setValidForm(false)
    } else {
      setValidForm(true)
    }
  }, [file, name, setPost, textError])
  return (
    <>
      <div className='fixed mt-32px ml-24px md:10% ' onClick={() => navigate('/')}>
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
          <div className='w-full md:w-2/3 md:max-w-3xl ml-auto mr-auto  overflow-hidden  mb-6px '>
            {' '}
            {post.comments == 0 ? (
              <div className='p-12px text-center text-gray-400'>Нет комментариев</div>
            ) : (
              <div>
                {comments !== undefined &&
                  comments.map(
                    (item: {
                      ID: number
                      author: string
                      text: string
                      likes: string
                      userImg: string
                      commentImg: string
                    }) => (
                      <div className='rounded-2xl bg-white mb-6px'>
                        <div className='flex items-center pl-8px pt-8px'>
                          <img className='w-54px h-54px' src={item.userImg} alt='' />
                          <div className='ml-12px font-bold text-lg text-green-900'>{item.author}</div>
                          {user.user.role === 'ADMIN' && (
                            <button className='w-full' onClick={() => handleDelete(item.text, item.ID)}>
                              <XIcon className='h-32px w-32px float-right mr-16px hover:text-red-600 hover:bg-gray-100 rounded-lg  text-green-600' />
                            </button>
                          )}
                          {user.user.role !== 'ADMIN' && user.user.name === item.author && (
                            <button className='w-full' onClick={() => handleDelete(item.text, item.ID)}>
                              <XIcon className='h-32px w-32px float-right mr-16px hover:text-red-600 hover:bg-gray-100 rounded-lg  text-green-600' />
                            </button>
                          )}
                        </div>
                        <div className='ml-16px text-lg pb-6px text-green-900'>{item.text}</div>
                        {item.commentImg !== '' && (
                          <img className='w-200px ml-10px pb-10px' src={item.commentImg} alt='загружается...' />
                        )}
                      </div>
                    ),
                  )}
              </div>
            )}
          </div>
          <form className='w-full md:w-2/3 md:max-w-3xl ml-auto mr-auto mb-6px' onSubmit={handleSubmit}>
            <TextareaAutosize
              cacheMeasurements
              onChange={(e) => handleChangeText(e)}
              value={text}
              className='w-full text-green-700 rounded-2xl resize-none outline-none pt-16px pb-16px pl-16px pr-16px'
              placeholder='Написать комментарий'
            />
            <div className='flex'>
              <label className='flex ml-10px md:ml-0px'>
                <input
                  type='file'
                  className='hidden'
                  accept='.png,.gif,.jpg,.jpeg'
                  onChange={(e) => handleChangeFile(e)}
                />
                <i className=''>
                  <PaperClipIcon className='w-40px text-white bg-green-600 p-6px rounded-xl' />
                </i>
                {file !== null && (
                  <img className='h-40px object-cover ml-40px rounded-md' alt='загружается' src={preview} />
                )}
              </label>
              <button
                disabled={!validForm}
                className='ml-auto mr-10px md:mr-0px bg-green-600 text-white pt-6px pb-6px pl-16px pr-16px rounded-xl'
              >
                Отправить
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default Post
