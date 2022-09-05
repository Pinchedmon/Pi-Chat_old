import React, { useEffect, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { PaperClipIcon } from '@heroicons/react/solid'
import useAuth from '../../../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getMessagesInfo } from '../../../../api/get'
import { postMessage } from '../../../../api/post'
interface iPostPage {
  file: File | null
  preview: string
  textArea: string
  textAreaError: string
  validForm: boolean
}
function Buttons(props: { firstName: string; secondName: string }) {
  const { refetch } = useQuery('message', () => getMessagesInfo(`${props.firstName.trim()} ${props.secondName.trim()}`))
  const navigate = useNavigate()
  const { user } = useAuth()
  const [path, setPath] = useState(null)
  const [messageData, setMessageData] = useState<iPostPage>({
    file: null,
    preview: '',
    textArea: '',
    textAreaError: 'Сообщение не может быть пустым',
    validForm: false,
  })
  const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageData((messageData: iPostPage) => ({ ...messageData, textArea: e.target.value }))
    if (!e.target.value) {
      setMessageData((messageData: iPostPage) => ({ ...messageData, textAreaError: 'Сообщение не может быть пустым' }))
    } else {
      setMessageData((messageData: iPostPage) => ({ ...messageData, textAreaError: '' }))
    }
  }

  const handleChangeFile = (e: React.SyntheticEvent<HTMLInputElement, Event>) => {
    const target = e.target as HTMLInputElement
    setMessageData((postData: iPostPage) => ({ ...postData, file: target.files[0] }))
    e.preventDefault()
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const messageImg = new FormData()
    if (messageData.file !== null) {
      messageImg.append('message', messageData.file)
    }
    event.preventDefault()
    postMessage(
      {
        firstName: props.firstName.trim(),
        secondName: props.secondName.trim(),
        text: messageData.textArea,
        refetch: refetch,
      },
      messageImg,
    )
    setMessageData((messageData: iPostPage) => ({ ...messageData, textArea: '' }))
    setMessageData((messageData: iPostPage) => ({ ...messageData, file: null }))
  }

  useEffect(() => {
    setPath(user.pathImg)
    if (messageData.file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setMessageData((messageData: iPostPage) => ({ ...messageData, preview: reader.result as string }))
      }
      reader.readAsDataURL(messageData.file)
    } else {
      setMessageData((messageData: iPostPage) => ({ ...messageData, preview: null }))
    }
    if (messageData.textAreaError && messageData.file === null) {
      setMessageData((messageData: iPostPage) => ({ ...messageData, validForm: true }))
    } else {
      setMessageData((messageData: iPostPage) => ({ ...messageData, validForm: false }))
    }
  }, [messageData.file, user.name, messageData.textAreaError, user.pathImg])
  return (
    <>
      <form className='w-full mb-6px' onSubmit={handleSubmit}>
        <div className='flex justify-center mb-10px'>
          <TextareaAutosize
            cacheMeasurements
            onChange={(e) => handleChangeText(e)}
            value={messageData.textArea}
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
            {messageData.file !== null && (
              <img className='h-40px object-cover ml-40px rounded-md' alt='загружается' src={messageData.preview} />
            )}
          </label>
          <button
            disabled={messageData.validForm}
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
