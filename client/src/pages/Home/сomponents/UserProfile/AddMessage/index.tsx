import React, { useContext, useEffect, useState } from 'react'
import { PaperClipIcon } from '@heroicons/react/outline'
import TextareaAutosize from 'react-textarea-autosize'

import { ArrowLeftIcon } from '@heroicons/react/solid'
import { addMessageSubmit } from './utils/addMessageSubmit'
import { handleChangeFile } from './utils/handleChangeFile'
import { handleTextChange } from './utils/handleTextChange'
import { UserContext } from '../../../../../App'
interface IAddMessage {
  name: string
  showMessage: () => void
}
interface IaddMessage {
  file: File
  preview: string
  validForm: boolean
  text: string
  textError: string
}
const AddMessage = (props: IAddMessage) => {
  const user = useContext(UserContext)
  const path = user.pathImg
  const { showMessage, name } = props
  const [message, setMessage] = useState<IaddMessage>({
    file: null,
    preview: '',
    validForm: false,
    text: '',
    textError: 'поле не может быть пустым',
  })
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

  return (
    <div className='absolute w-full top-0px backdrop-blur-sm h-screen'>
      <div className='mt-100px'>
        <div className='flex flex-col justify-center items-center'>
          <form
            className=' text-center flex flex-col bg-white p-16px w-90% border-1 rounded-3xl border-2   shadow-2xl'
            onSubmit={(e) =>
              addMessageSubmit(e, {
                firstName: user.name,
                secondName: name,
                text: message.text,
                path,
                showMessage,
                file: message.file !== null ? message.file : undefined,
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
              onChange={(e) => handleTextChange(e, setMessage, message)}
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
                  onChange={(e) => handleChangeFile(e, setMessage, message)}
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
