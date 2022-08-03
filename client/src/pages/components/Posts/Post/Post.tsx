import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import redaxios from 'redaxios'
import { likeHandler } from '../../../../api/likeHandler'
import { ArrowLeftIcon, AnnotationIcon, HeartIcon, PaperClipIcon, XIcon } from '@heroicons/react/solid'
import { useQuery } from 'react-query'
import TextareaAutosize from 'react-textarea-autosize'
import { postComment } from '../../../../api/session'
import useAuth from '../../../../hooks/useAuth'

const Post = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  const name = user.user.name
  const [path, setPath] = useState(null)
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
    redaxios.put(`http://localhost:6060/posts/post?id=${post.ID}&comments=${Number(post.comments) + 1}`)
    const commentImg = new FormData()
    if (file !== null) {
      commentImg.append('comment', file)
    }
    event.preventDefault()
    postComment({ id: post.ID, author: name, text: text, userImg: path }, commentImg)
    setText('')
    setFile(null)

    navigate(`?id=${post.ID}`)
    setTimeout(() => {
      refetch()
    }, 1000)
  }
  const getPost = async () => {
    const response = await redaxios.get(`http://localhost:6060/posts/post${location.search}`)
    setImg(response.data.image)
    setPost(response.data.post[0])
    setComments(response.data.comments)
  }
  const handleDelete = (text: string, id: number) => {
    redaxios.delete(`http://localhost:6060/posts/comment?text=${text}&id=${id}`)
    setTimeout(() => {
      refetch()
    }, 100)
  }
  const { data, refetch } = useQuery('post', () => getPost(), {})
  useEffect(() => {
    setPost(data)
  }, [data])

  useEffect(() => {
    setPath(user.user.img)
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
  }, [file, name, setPost, textError, user.user.img])
  return (
    <>
      <div className='border-b-2 border-gray-300 p-16px ' onClick={() => navigate('/')}>
        <ArrowLeftIcon className='w-48px text-green-600 rounded-md bg-gray-100 p-6px hover:bg-green-600 hover:text-white' />
      </div>
      <div className='flex flex-col mt-16px '>
        {post !== undefined && (
          <div className=''>
            <div className='w-full flex flex-row mb-16px border-b-2 border-gray-300'>
              <img className='ml-24px mr-16px h-54px rounded-xl w-54px' src={post.userImg} alt=' ' />
              <div className='flex-col '>
                <div className='flex items-center align-center  -mt-4px'>
                  <div className='text-lg md:text-xl  font-bold'>{post.author}</div>
                  <p className='ml-8px font-bold text-md text-gray-500'>@Псевдоимя</p>
                  <p className='ml-8px font-bold text-md text-gray-500'>24ч</p>
                </div>
                <div className='mt-4px mb-12px'>{post.text}</div>
                {post.postImg !== '' && <img className='w-1/2 rounded-xl' src={post.postImg} alt=' ' />}
                <div className='flex items-center mb-16px mt-16px'>
                  <button
                    className='flex'
                    onClick={() => {
                      likeHandler(user.user.id.toString(), post.ID, post.likes)
                      refetch()
                    }}
                  >
                    <HeartIcon className='text-green-600 w-28px' />
                    <span className='text-green-600 text-xl font-bold '>
                      {post.likes === '0'
                        ? '0'
                        : /\s/.test(post.likes)
                        ? post.likes.split(' ').length
                        : [post.likes].length}
                    </span>
                  </button>
                  <button className='flex ml-16px'>
                    <AnnotationIcon className=' text-green-600 w-28px' />
                    <span className='text-green-600 text-xl font-bold ml-6px '>{post.comments}</span>
                  </button>
                </div>
              </div>
            </div>

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
                      <div className='w-full flex flex-row mb-16px border-b-2 border-gray-300'>
                        <img className='ml-24px mr-16px h-54px rounded-xl w-54px' src={item.userImg} alt=' ' />
                        <div className='flex-col '>
                          <div className='flex items-center align-center  -mt-4px'>
                            <div className='text-lg md:text-xl  font-bold'>{item.author}</div>
                            <p className='ml-8px font-bold text-md text-gray-500'>@Псевдоимя</p>
                            <p className='ml-8px font-bold text-md text-gray-500'>24ч</p>
                          </div>
                          <div className='mt-4px mb-12px'>{item.text}</div>
                          {item.commentImg !== '' && (
                            <img className='w-1/2 pb-10px rounded-xl' src={item.commentImg} alt='загружается...' />
                          )}
                          {user.user.role === 'ADMIN' && (
                            <button className='' onClick={() => handleDelete(item.text, item.ID)}>
                              <XIcon className='h-32px w-32px  hover:text-red-600 hover:bg-gray-100 rounded-lg  text-green-600' />
                            </button>
                          )}
                          {user.user.role !== 'ADMIN' && user.user.name === item.author && (
                            <button className='' onClick={() => handleDelete(item.text, item.ID)}>
                              <XIcon className='h-32px w-32px hover:text-red-600 hover:bg-gray-100 rounded-lg  text-green-600' />
                            </button>
                          )}
                        </div>
                      </div>
                    ),
                  )}
              </div>
            )}

            <form className='w-full mb-6px' onSubmit={handleSubmit}>
              <div className='flex justify-center mb-10px'>
                <TextareaAutosize
                  cacheMeasurements
                  onChange={(e) => handleChangeText(e)}
                  value={text}
                  className='rounded-2xl resize-none outline-none pt-16px pb-16px pl-16px pr-16px border-2 w-90%'
                  placeholder='Написать комментарий'
                />
              </div>
              <div className='flex ml-16px'>
                <label className='flex  '>
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
                  className='ml-auto mr-16px bg-green-600 text-white pt-6px pb-6px pl-16px pr-16px rounded-xl'
                >
                  Отправить
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  )
}

export default Post
