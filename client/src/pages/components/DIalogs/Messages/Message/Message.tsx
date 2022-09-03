import { CheckCircleIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Img from '../../../../../components/Img'

function Message(props: { username: string; messageImg: string; text: string }) {
  const [selectedMsg, setSelectedMsg] = useState('')
  const navigate = useNavigate()
  const handleClick = () => {
    if (selectedMsg === '') {
      setSelectedMsg('bg-gray-100')
    } else {
      setSelectedMsg('')
    }
  }
  const { username, messageImg, text } = props
  return (
    <div className={`pt-8px ${selectedMsg}`}>
      <div className='w-full flex flex-row mb-10px '>
        <Img
          name={username}
          className='ml-24px mr-16px h-54px rounded-xl w-54px cursor-pointer'
          onClick={() => navigate(`/${username}`)}
        />
        <div className='flex-col'>
          <div className='flex items-center align-center'>
            <div className='text-lg md:text-xl font-bold cursor-pointer' onClick={() => navigate(`/${username}`)}>
              {username}
            </div>
            <p className='ml-8px font-bold text-md text-gray-500'>24ч</p>
          </div>
          {/* item.mesageImg} */}
          <img src={messageImg} alt='' />
          <div className='mt-4px mb-12px'>{text}</div>
        </div>
        <div className='w-full flex align-center justify-end' onClick={handleClick}>
          <CheckCircleIcon className={'w-24px mr-10px ' + (selectedMsg === '' ? 'text-gray-300' : 'text-green-500')} />
        </div>
      </div>
    </div>
  )
}

export default Message
