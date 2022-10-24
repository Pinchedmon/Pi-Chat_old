import React, { useContext, useEffect, useState } from 'react'
import { CheckCircleIcon } from '@heroicons/react/outline'
import { handleClick } from './utils/handleClick'
import { addSelected, removeSelected, resetSelected } from '../../../../../../../../../../state/messageReducer'
import { UserContext } from '../../../../../../../../../../App'
import { Imessage } from '../../../../../../types/message.interface'

function Message(props: Imessage) {
  const user = useContext(UserContext)
  const { name, messageImg, dispatch, text, reset, ID, time } = props
  const [selectedMsg, setSelectedMsg] = useState('')
  useEffect(() => {
    if (reset) {
      setSelectedMsg('')
      dispatch(resetSelected())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset, text, ID])
  return (
    <div className={`flex items-center relative ${selectedMsg}  `}>
      <div
        className={`w-full flex flex-row p-4px pl-8px pr-8px  ${
          selectedMsg !== '' && name === user.name ? 'mr-32px' : ''
        }  ${name === user.name ? 'justify-end' : ''} `}
      >
        <div className='flex items-center mr-6px text-gray-400'> {name === user.name ? time : null}</div>
        {text !== '' ? (
          <>
            <div
              className={`flex-col max-w-xs rounded-xl ${
                name === user.name ? 'bg-green-600 text-white' : 'bg-gray-200'
              } `}
            >
              <div className={`bont-bold text-lg  pt-5px pb-5px pl-8px pr-8px`}>{text}</div>
              <img src={messageImg} alt='' className='max-w-xs rounded-b-xl' />
            </div>
            <div className='flex items-center ml-6px text-gray-400'>{name !== user.name ? time : null}</div>
          </>
        ) : (
          <>
            <img src={messageImg} alt='' className='max-w-xs rounded-xl' />
            {name !== user.name ? time : null}
          </>
        )}
      </div>
      <div
        className={`z-0 absolute w-full h-full flex ${name === user.name ? 'pl-8px justify-start' : 'justify-end'}`}
        onClick={() => handleClick({ selectedMsg, addSelected, removeSelected, dispatch, setSelectedMsg, ID })}
      >
        <CheckCircleIcon className={'w-24px mr-10px ' + (selectedMsg === '' ? 'text-gray-300' : 'text-green-500')} />
      </div>
    </div>
  )
}

export default Message
