import React, { useEffect, useState } from 'react'
import { PaperClipIcon } from '@heroicons/react/outline'
import redaxios from 'redaxios'
import { FormEvent } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import useAuth from '../../../hooks/useAuth'
import { ArrowLeftIcon } from '@heroicons/react/solid'
interface IaddMessage {
  name: string
  showMessage: () => void
}
interface IAddMessageSubmit {
  name: string
  text: string
  path: string
  showMessage: () => void
  file: File
}

const AddMessage = (props: IaddMessage) => {
  const { user } = useAuth()
  const path = user.user.pathImg
  const { showMessage, name } = props

  const [message, setMessage] = useState({
    file: null,
    preview: '',
    validForm: false,
    text: '',
    textError: 'Пустое поле ввода',
  })

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage((message) => ({ ...message, text: e.target.value }))
    if (!e.target.value) {
      setMessage((message) => ({ ...message, textError: 'Имя не может быть пустым' }))
    } else {
      setMessage((message) => ({ ...message, textError: '' }))
    }
  }

  const handleChangeFile = (e: React.SyntheticEvent<EventTarget>) => {
    const target = e.target as HTMLInputElement
    setMessage((message) => ({ ...message, file: target.files[0] }))
  }

  useEffect(() => {
    if (message.textError && message.file === null) {
      setMessage((addMessage) => ({ ...addMessage, validForm: false }))
    } else {
      setMessage((addMessage) => ({ ...addMessage, validForm: true }))
    }
  }, [message.file, message.textError])

  useEffect(() => {
    if (message.file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setMessage((message) => ({ ...message, preview: reader.result as string }))
      }
      reader.readAsDataURL(message.file)
    } else {
      setMessage((message) => ({ ...message, preview: null }))
    }
  }, [message.file])

  function addMessageSubmit(event: FormEvent<HTMLFormElement>, props: IAddMessageSubmit) {
    let data = new FormData()
    data.append('message', props.file)
    if (props.text !== '') {
      redaxios.post(
        `http://localhost:6060/message/post?name=${user.user.name}&secondName=${name}&text=${props.text}&userImg=${props.path}`,
        data,
      )
      props.showMessage()
      event.preventDefault()
    } else {
      window.alert('Какое-то поле незаполнено!')
      event.preventDefault()
    }
  }

  return (
    <div className='absolute w-full top-0px backdrop-blur-sm h-screen'>
      <div className='mt-100px'>
        <div className='flex flex-col justify-center items-center'>
          <form
            className=' text-center flex flex-col bg-white p-16px w-90% border-1 rounded-3xl border-2   shadow-2xl'
            onSubmit={(e) =>
              addMessageSubmit(e, {
                name: user.user.name,
                text: message.text,
                path,
                showMessage,
                file: message.file,
              })
            }
          >
            <div className='flex h-54px items-center text-green-600 rounded-2xl '>
              <ArrowLeftIcon
                onClick={showMessage}
                className='w-48px  rounded-md bg-gray-100 p-6px  hover:text-red-700'
              />
              <h1 className='absolute left-1/2 -translate-x-1/2 text-2xl  rounded-xl p-10px font-bold  '>
                Сообщение для {name}
              </h1>
            </div>
            <TextareaAutosize
              cacheMeasurements
              onChange={handleTextChange}
              value={message.text}
              className='mb-10px mt-10px text-green-700 border-3 rounded-2xl resize-none outline-none p-10px'
              placeholder='Текст поста'
            />
            <div className='flex'>
              <label className='flex '>
                <input
                  type='file'
                  className='hidden'
                  accept='.png,.gif,.jpg,.jpeg'
                  onChange={(e) => handleChangeFile(e)}
                />
                <i className=''>
                  <PaperClipIcon className='w-40px text-white bg-green-600 p-6px rounded-xl' />
                </i>
                {message.file !== null && (
                  <img className='h-40px object-cover ml-40px rounded-md' alt='загружается' src={message.preview} />
                )}
              </label>
              <button
                disabled={!message.validForm}
                className='ml-auto bg-green-600 text-white pt-6px  pb-6px pl-16px pr-16px rounded-xl'
              >
                Отправить
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default AddMessage
