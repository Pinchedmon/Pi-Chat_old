import React, { useContext, useEffect, useState } from 'react'
import { CheckCircleIcon } from '@heroicons/react/outline'
import { handleClick } from './utils/handleClick'
import { addSelected, removeSelected, resetSelected } from '../../../../../../../../../../state/messageReducer'
import { UserContext } from '../../../../../../../../../../App'
import { Imessage } from '../../../../../../types/message.interface'
import moment from 'moment'
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline'
const Message = (props: Imessage) => {
  const user = useContext(UserContext)
  const { name, messageImg, dispatch, text, reset, ID, date, read } = props
  const [selectedMsg, setSelectedMsg] = useState('')
  useEffect(() => {
    if (reset) {
      setSelectedMsg('')
      dispatch(resetSelected())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset, text, ID])
  return (
    <div className={`message ${selectedMsg} ${user.name !== name ? (read === 0 ? 'bg-gray-100' : '') : ''} `}>
      <div
        className={`message-position ${selectedMsg !== '' && name === user.name ? 'mr-32px' : ''}  ${
          name === user.name ? 'justify-end' : ''
        } `}
      >
        <div className='message-info'> {name === user.name ? moment(date).format('LT') : null}</div>
        {text !== '' ? (
          <>
            <div
              className={`message-data ${
                name === user.name ? 'bg-green-600 text-white ' : 'bg-gray-200   dark:text-black'
              } `}
            >
              <div className='message-text'>{text}</div>
              <img src={messageImg} alt='' className='message-img rounded-b-xl' />
            </div>
            <div className='message-date'>{name !== user.name ? moment(date).format('LT') : null}</div>
          </>
        ) : (
          <>
            <img src={messageImg} alt='' className='message-img rounded-xl' />
            {name !== user.name ? moment(date).format('LT') : null}
          </>
        )}
      </div>
      <div
        className={`check-message ${name === user.name ? 'pl-8px justify-start' : 'justify-end'}`}
        onClick={() => handleClick({ selectedMsg, addSelected, removeSelected, dispatch, setSelectedMsg, ID })}
      >
        <CheckCircleIcon className={`check-message-icon ${selectedMsg === '' ? 'text-gray-300' : 'text-green-500'}`} />
        {user.name === name ? read === 1 ? <EyeIcon className='w-16px' /> : <EyeOffIcon className='w-16px' /> : ''}
      </div>
    </div>
  )
}

export default Message
