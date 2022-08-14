import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import redaxios from 'redaxios'
import { ArrowLeftIcon, AnnotationIcon, HeartIcon, PaperClipIcon, XIcon } from '@heroicons/react/solid'
import { useQuery } from 'react-query'
import TextareaAutosize from 'react-textarea-autosize'
import { postComment } from '../../../../api/session'
import useAuth from '../../../../hooks/useAuth'
type iPost = {
  userImg: string
  author: string
  username: string
  text: string
  postImg: string
  likes: number | string
  ID: number
  comments: number | string
}
type iComment = {
  ID: number
  author: string
  username: string
  text: string
  likes: string
  userImg: string
  commentImg: string
}
interface iPostPage {
  post: iPost
  file: File | null
  preview: string
  comments: Array<iComment> | undefined
  textArea: string
  textAreaError: string
  validForm: boolean
}
const Post = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  const name = user.user.name
  const [path, setPath] = useState(null)
  const [postData, setPostData] = useState<iPostPage>({
    post: { ID: 0, author: '', username: '', text: '', userImg: '', postImg: '', likes: '', comments: 0 },
    file: null,
    preview: '',
    comments: [],
    textArea: '',
    textAreaError: 'Сообщение не может быть пустым',
    validForm: false,
  })
  const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostData((postData: iPostPage) => ({ ...postData, textArea: e.target.value }))
    if (!e.target.value) {
      setPostData((postData: iPostPage) => ({ ...postData, textArea: 'Сообщение не может быть пустым' }))
    } else {
      setPostData((postData: iPostPage) => ({ ...postData, textAreaError: '' }))
    }
  }
  const handleChangeFile = (e: React.SyntheticEvent<HTMLInputElement, Event>) => {
    const target = e.target as HTMLInputElement
    setPostData((postData: iPostPage) => ({ ...postData, file: target.files[0] }))
    e.preventDefault()
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const commentImg = new FormData()
    if (postData.file !== null) {
      commentImg.append('comment', postData.file)
    }
    event.preventDefault()
    postComment(
      { id: postData.post.ID, author: name, name: user.user.username, text: postData.textArea, userImg: path, refetch: refetch },
      commentImg,
    )
    setPostData((postData: iPostPage) => ({ ...postData, textArea: '' }))
    setPostData((postData: iPostPage) => ({ ...postData, file: null }))

    navigate(`?id=${postData.post.ID}`)
  }
  const getPost = async () => {
    const response = await redaxios.get(`http://localhost:6060/posts/post${location.search}`)
    setPostData((postData: iPostPage) => ({ ...postData, post: response.data.post[0] }))
    setPostData((postData: iPostPage) => ({ ...postData, comments: response.data.comments }))
  }
  const handleDelete = (text: string, id: number) => {
    redaxios.delete(`http://localhost:6060/posts/comment?text=${text}&id=${id}`).then((response) => {
      if (response.status === 200) {
        refetch()
      }
    })
  }
  const { data, refetch } = useQuery('post', () => getPost(), {})
  useEffect(() => {
    setPostData((postData: any) => ({ ...postData, post: data }))
  }, [data])

  useEffect(() => {
    setPath(user.user.pathImg)
    if (postData.file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPostData((postData: iPostPage) => ({ ...postData, preview: reader.result as string }))
      }
      reader.readAsDataURL(postData.file)
    } else {
      setPostData((postData: iPostPage) => ({ ...postData, preview: null }))
    }
    if (postData.textAreaError && postData.file === null) {
      setPostData((postData: iPostPage) => ({ ...postData, validForm: false }))
    } else {
      setPostData((postData: iPostPage) => ({ ...postData, validForm: true }))
    }
  }, [postData.file, name, postData.textAreaError, user.user.pathImg])
  return (
    <>
      <div className='border-b-2 border-gray-300 p-16px ' onClick={() => navigate('/')}>
        <ArrowLeftIcon className='w-48px text-green-600 rounded-md bg-gray-100 p-6px hover:bg-green-600 hover:text-white' />
      </div>
      <div className='flex flex-col mt-16px '>
        {postData.post !== undefined && (
          <div className=''>
            <div className='w-full flex flex-row mb-16px border-b-2 border-gray-300'>
              <img className='ml-24px mr-16px h-54px rounded-xl w-54px' src={postData.post.userImg} alt=' ' />
              <div className='flex-col '>
                <div className='flex items-center align-center  -mt-4px'>
                  <div className='text-lg md:text-xl  font-bold'>{postData.post.username}</div>
                  <p className='ml-8px font-bold text-md text-gray-500'>@{postData.post.author}</p>
                  <p className='ml-8px font-bold text-md text-gray-500'>24ч</p>
                </div>
                <div className='mt-4px mb-12px'>{postData.post.text}</div>
                {postData.post.postImg !== '' && (
                  <img className='w-1/2 rounded-xl' src={postData.post.postImg} alt=' ' />
                )}
                <div className='flex items-center mb-16px mt-16px'>
                  <button
                    className='flex'
                    onClick={() => {
                      redaxios
                        .put(`http://localhost:6060/posts/feed?postId=${postData.post.ID}&profileName=${name}`)
                        .then((response) => {
                          if (response.status === 200) {
                            refetch()
                          }
                        })
                    }}
                  >
                    <HeartIcon className='text-green-600 w-28px' />
                    <span className='text-green-600 text-xl font-bold '>{postData.post.likes}</span>
                  </button>
                  <button className='flex ml-16px'>
                    <AnnotationIcon className=' text-green-600 w-28px' />
                    <span className='text-green-600 text-xl font-bold ml-6px '>{postData.post.comments}</span>
                  </button>
                </div>
              </div>
            </div>
            {postData.post.comments == 0 ? (
              <div className='p-12px text-center text-gray-400'>Нет комментариев</div>
            ) : (
              <div>
                {postData.comments !== undefined &&
                  postData.comments.map((item: iComment) => (
                    <div className='w-full flex flex-row mb-16px border-b-2 border-gray-300'>
                      <img className='ml-24px mr-16px h-54px rounded-xl w-54px' src={item.userImg} alt=' ' />
                      <div className='flex-col '>
                        <div className='flex items-center align-center  -mt-4px'>
                          <div className='text-lg md:text-xl  font-bold'>{item.username}</div>
                          <p className='ml-8px font-bold text-md text-gray-500'>@{item.author}</p>
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
                  ))}
              </div>
            )}
            <form className='w-full mb-6px' onSubmit={handleSubmit}>
              <div className='flex justify-center mb-10px'>
                <TextareaAutosize
                  cacheMeasurements
                  onChange={(e) => handleChangeText(e)}
                  value={postData.textArea}
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
                  {postData.file !== null && (
                    <img className='h-40px object-cover ml-40px rounded-md' alt='загружается' src={postData.preview} />
                  )}
                </label>
                <button
                  disabled={!postData.validForm}
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
