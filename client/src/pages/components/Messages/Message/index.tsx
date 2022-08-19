import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useLocation } from 'react-router-dom'
import { getMessagesInfo } from '../../../../api/session'
interface CustomState {
  names: string
}
const Message = () => {
  //   const navigate = useNavigate()
  //   const { user } = useAuth()
  //   let name = user.name
  const location = useLocation()
  const state = location.state as CustomState
  const { data, refetch } = useQuery('myPosts', () => getMessagesInfo(state.names))
  const [messages, setMessage] = useState<any>()
  useEffect(() => {
    if (data !== undefined) {
      setMessage(data)
    }
  }, [])
  return (
    <>
      {messages !== undefined &&
        messages.map((item: any) => (
          <div>
            <div className='w-full flex flex-row mb-16px border-b-2 border-gray-300'>
              <img className='ml-24px mr-16px h-54px rounded-xl w-54px' src={item.userImg} alt=' ' />
              <div className='flex-col '>
                <div className='flex items-center align-center  -mt-4px'>
                  <div className='text-lg md:text-xl  font-bold'>{item.username}</div>
                  <p className='ml-8px font-bold text-md text-gray-500'>24ч</p>
                </div>
                <div className='mt-4px mb-12px'>{item.text}</div>
              </div>
            </div>
          </div>
        ))}
    </>
  )
}
export default Message
