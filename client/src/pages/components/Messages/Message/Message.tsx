import React, { useEffect, useState, useRef } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { getMessagesInfo } from '../../../../api/get'
import Img from '../../../../components/Img'

const Message = (props: { names: string }) => {
  const navigate = useNavigate()
  const bottomRef = useRef(null)
  const { data, refetch } = useQuery('message', () => getMessagesInfo(props.names))
  const [messages, setMessage] = useState<any>()
  useEffect(() => {
    if (data !== undefined) {
      setMessage(data)
    }
    refetch()
  }, [data, refetch])
  useEffect(() => {
    if (data !== undefined) {
      bottomRef.current?.scrollIntoView({ behavior: 'auto' })
    }
  }, [data, messages])
  return (
    <div className='mt-10px'>
      {messages !== undefined &&
        messages.map((item: any) => (
          <div className=''>
            <div className='w-full flex flex-row mb-16px '>
              <Img
                name={item.username}
                className='ml-24px mr-16px h-54px rounded-xl w-54px'
                onClick={() => navigate(`/${item.username}`)}
              />
              <div className='flex-col '>
                <div className='flex items-center align-center  -mt-4px'>
                  <div className='text-lg md:text-xl  font-bold' onClick={() => navigate(`/${item.username}`)}>
                    {item.username}
                  </div>
                  <p className='ml-8px font-bold text-md text-gray-500'>24ч</p>
                </div>
                {/* item.mesageImg} */}
                <img src={item.messageImg} alt='' />
                <div className='mt-4px mb-12px'>{item.text}</div>
              </div>
            </div>
          </div>
        ))}
      <div ref={bottomRef} />
    </div>
  )
}
export default Message
