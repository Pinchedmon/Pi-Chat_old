import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { getMessages } from '../../api/session'
import Img from './Img'

type iMessage = {
  ID: number
  names: string
  last: string
}

function CMessages(props: { name: string }) {
  const { name } = props
  const navigate = useNavigate()
  const { data } = useQuery('messages', () => getMessages(name), {})
  const [messages, setMessages] = useState<any>()

  useEffect(() => {
    setMessages(data)
  }, [data])
  //   const handleDelete = (text: string, id: number) => {
  //     redaxios.delete(`http://localhost:6060/posts/comment?text=${text}&id=${id}`).then((response) => {
  //       if (response.status === 200) {
  //         refetch()
  //       }
  //     })
  //   }
  return (
    <>
      {messages !== undefined ? (
        messages.data.map((item: iMessage) => (
          <div className='w-full flex flex-row mb-16px border-b-2 border-gray-300'>
            <Img
              onClick={() => navigate('/message', { state: { names: item.names } })}
              className='ml-24px mr-16px h-54px cursor-pointer rounded-xl w-54px'
              name={item.names.replace(name, '').trim()}
            />
            <div className='flex-col '>
              <div className='flex items-center align-center  -mt-4px'>
                <div
                  onClick={() => navigate('/message', { state: { names: item.names } })}
                  className='text-lg md:text-xl font-bold cursor-pointer hover:underline'
                >
                  {item.names.replace(name, '')}
                </div>
                <p className='ml-8px font-bold text-md text-gray-500'>24ч</p>
              </div>
              <div className='mt-4px mb-12px'>{item.last}</div>
              {/* {item.commentImg !== '' && (
                    <img className='w-1/2 pb-10px rounded-xl' src={item.commentImg} alt='загружается...' />
                  )}
                  {role === 'ADMIN' && (
                    <button className='' onClick={() => handleDelete(item.text, item.ID)}>
                      <XIcon className='h-32px w-32px  hover:text-red-600 hover:bg-gray-100 rounded-lg  text-green-600' />
                    </button>
                  )}
                  {role !== 'ADMIN' && name === item.author && (
                    <button className='' onClick={() => handleDelete(item.text, item.ID)}>
                      <XIcon className='h-32px w-32px hover:text-red-600 hover:bg-gray-100 rounded-lg  text-green-600' />
                    </button>
                  )} */}
            </div>
          </div>
        ))
      ) : (
        <div className='p-12px text-center text-gray-400'>Нет сообщений</div>
      )}
    </>
  )
}

export default CMessages
