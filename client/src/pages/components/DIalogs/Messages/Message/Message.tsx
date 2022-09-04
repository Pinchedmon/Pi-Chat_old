import { CheckCircleIcon } from '@heroicons/react/outline'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Img from '../../../../../components/Img'

function Message(props: {
  username: string
  messageImg: string
  text: string
  checkSelect: (x: any, y: any) => any
  reset: boolean
}) {
  const { username, messageImg, text, checkSelect, reset } = props
  const [selectedMsg, setSelectedMsg] = useState('')
  const navigate = useNavigate()
  const handleClick = () => {
    if (selectedMsg === '') {
      setSelectedMsg('bg-gray-100')
      checkSelect('+', text)
    } else {
      setSelectedMsg('')
      checkSelect('-', text)
    }
  }
  useEffect(() => {
    if (reset) {
      setSelectedMsg('')
      checkSelect('x', text)
    }
  }, [checkSelect, reset, text])
  return (
    <div className={`flex items-center relative ${selectedMsg} mb-4px `}>
      <div className='w-full flex flex-row p-8px'>
        <Img
          name={username}
          className='z-10 ml-24px mr-16px h-54px rounded-xl w-54px cursor-pointer'
          onClick={() => navigate(`/${username}`)}
        />
        <div className='flex-col'>
          <div className='flex items-center align-center'>
            <div
              className='z-10 text-lg md:text-xl font-bold cursor-pointer hover:underline'
              onClick={() => navigate(`/${username}`)}
            >
              {username}
            </div>
            <p className='ml-8px font-bold text-md text-gray-500'>24ч</p>
          </div>
          <img src={messageImg} alt='' />
          <div className='mt-4px '>{text}</div>
        </div>
      </div>
      <div className='z-0 absolute w-full h-full flex justify-end' onClick={handleClick}>
        <CheckCircleIcon className={'w-24px mr-10px ' + (selectedMsg === '' ? 'text-gray-300' : 'text-green-500')} />
      </div>
    </div>
  )
}

export default Message
