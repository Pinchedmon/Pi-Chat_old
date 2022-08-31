import React, { useEffect, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { PaperClipIcon } from '@heroicons/react/solid'
import { postComment } from '../../../../api/post'
import useAuth from '../../../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
interface iPostPage {
  file: File | null
  preview: string
  textArea: string
  textAreaError: string
  validForm: boolean
}
function Buttons(id: any) {
  const { refetch } = useQuery('comments')
  const navigate = useNavigate()
  const { user } = useAuth()
  const [path, setPath] = useState(null)
  const [postData, setPostData] = useState<iPostPage>({
    file: null,
    preview: '',
    textArea: '',
    textAreaError: 'Сообщение не может быть пустым',
    validForm: false,
  })
  const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostData((postData: iPostPage) => ({ ...postData, textArea: e.target.value }))
    if (!e.target.value) {
      setPostData((postData: iPostPage) => ({ ...postData, textAreaError: 'Сообщение не может быть пустым' }))
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
      {
        id: id.id,
        author: user.name,
        name: user.username,
        text: postData.textArea,
        userImg: path,
        refetch: () => null,
      },
      commentImg,
    )
    setPostData((postData: iPostPage) => ({ ...postData, textArea: '' }))
    setPostData((postData: iPostPage) => ({ ...postData, textAreaError: '' }))
    setPostData((postData: iPostPage) => ({ ...postData, file: null }))
    setPostData((postData: iPostPage) => ({ ...postData, validForm: true }))
    refetch()
    navigate(`?id=${id.id}`)
  }
  useEffect(() => {
    setPath(user.pathImg)
    if (postData.file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPostData((postData: iPostPage) => ({ ...postData, preview: reader.result as string }))
      }
      reader.readAsDataURL(postData.file)
    } else {
      setPostData((postData: iPostPage) => ({ ...postData, preview: null }))
    }
  }, [postData.file, user.name, postData.textAreaError, user.pathImg])
  useEffect(() => {
    if (postData.textArea === '') {
      setPostData((postData: iPostPage) => ({ ...postData, textAreaError: 'Сообщение не может быть пустым' }))
    }
    if (postData.textAreaError === '' && postData.file === null) {
      setPostData((postData: iPostPage) => ({ ...postData, validForm: false }))
    } else {
      setPostData((postData: iPostPage) => ({ ...postData, validForm: true }))
    }
  }, [postData.file, postData.textArea, postData.textAreaError])
  return (
    <>
      <form className='w-full mb-6px' onSubmit={handleSubmit}>
        <div className='flex flex-col items-center mb-10px'>
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
            <input type='file' className='hidden' accept='.png,.gif,.jpg,.jpeg' onChange={(e) => handleChangeFile(e)} />
            <i className=''>
              <PaperClipIcon className='w-40px text-white bg-green-600 p-6px rounded-xl' />
            </i>
            {postData.file !== null && (
              <img className='h-40px object-cover ml-40px rounded-md' alt='загружается' src={postData.preview} />
            )}
          </label>
          <button
            disabled={postData.validForm}
            className='ml-auto mr-16px bg-green-600 text-white pt-6px pb-6px pl-16px pr-16px rounded-xl'
          >
            Отправить
          </button>
        </div>
      </form>
    </>
  )
}

export default Buttons
