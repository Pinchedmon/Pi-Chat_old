import React, { useContext, useEffect, useState } from 'react'
import { PaperClipIcon } from '@heroicons/react/outline'
import TextareaAutosize from 'react-textarea-autosize'

import { ArrowLeftIcon } from '@heroicons/react/solid'
import { addMessageSubmit } from './utils/addMessageSubmit'
import { handleChangeFile } from './utils/handleChangeFile'
import { handleTextChange } from './utils/handleTextChange'
import { UserContext } from '../../../../../../App'
import { IaddMessage, Imessage } from '../../types/addMessage.inteface'

const AddMessage = (props: IaddMessage) => {
  const user = useContext(UserContext)
  const path = user.pathImg
  const { name, setIsOpen } = props
  const [message, setMessage] = useState<Imessage>({
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
    <>
      <form
        className='addMessage'
        onSubmit={(e) => {
          addMessageSubmit(e, {
            firstName: user.name,
            secondName: name,
            text: message.text,
            path,
            file: message.file !== null ? message.file : undefined,
          })
          setIsOpen()
        }}
      >
        <div className='addMessage-title'>
          <ArrowLeftIcon onClick={() => setIsOpen()} className='addMessage-title-icon' />
          <h1 className='addMessage-title-name'>Сообщение для {name}</h1>
        </div>
        <TextareaAutosize
          cacheMeasurements
          onChange={(e) => handleTextChange(e, setMessage, message)}
          value={message.text}
          className='addMessage-textArea'
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
              <PaperClipIcon className='addMessage-sending-icon' />
            </i>
            {message.file !== null && (
              <img className='addMessage-sending__img' alt='загружается' src={message.preview} />
            )}
          </label>
          <button disabled={!message.validForm} className='addMessage-sending__button'>
            Отправить
          </button>
        </div>
      </form>
    </>
  )
}
export default AddMessage
