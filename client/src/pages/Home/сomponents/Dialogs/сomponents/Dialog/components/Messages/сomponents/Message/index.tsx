import React, { useContext, useEffect, useState } from 'react'
import { CheckCircleIcon } from '@heroicons/react/outline'
import { handleClick } from './utils/handleClick'
import { addSelected, removeSelected, resetSelected } from '../../../../../../../../../../state/messageReducer'
import { UserContext } from '../../../../../../../../../../App'
import { Imessage } from '../../../../../../types/message.interface'
import moment from 'moment'

const Message = (props: Imessage) => {
  const user = useContext(UserContext)
  const { index, name, messageImg, dispatch, text, reset, ID, time } = props
  const [selectedMsg, setSelectedMsg] = useState('')
  useEffect(() => {
    if (reset) {
      setSelectedMsg('')
      dispatch(resetSelected())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset, text, ID])
  return (
    <div key={index} className={`message ${selectedMsg}  `}>
      <div
        className={`message-position ${selectedMsg !== '' && name === user.name ? 'mr-32px' : ''}  ${
          name === user.name ? 'justify-end' : ''
        } `}
      >
        <div className='message-info'> {name === user.name ? moment(time).format('LT') : null}</div>
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
            <div className='message-date'>{name !== user.name ? moment(time).format('LT') : null}</div>
          </>
        ) : (
          <>
            <img src={messageImg} alt='' className='message-img rounded-xl' />
            {name !== user.name ? time : null}
          </>
        )}
      </div>
      <div
        className={`check-message ${name === user.name ? 'pl-8px justify-start' : 'justify-end'}`}
        onClick={() => handleClick({ selectedMsg, addSelected, removeSelected, dispatch, setSelectedMsg, ID })}
      >
        <CheckCircleIcon className={`check-message-icon ${selectedMsg === '' ? 'text-gray-300' : 'text-green-500'}`} />
      </div>
    </div>
  )
}

export default Message
