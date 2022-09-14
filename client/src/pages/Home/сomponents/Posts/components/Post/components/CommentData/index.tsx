import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { getComments } from '../../../../../../../../api/get'
import { XIcon } from '@heroicons/react/solid'
import redaxios from 'redaxios'
import { useNavigate } from 'react-router-dom'

type iComment = {
  ID: number
  author: string
  username: string
  text: string
  likes: string
  userImg: string
  commentImg: string
}

function CComments(props: { name: string; getObject: any; role: string }) {
  const navigate = useNavigate()
  const { name, getObject, role } = props
  const { data, refetch } = useQuery('comments', () => getComments(getObject), {})
  const [comments, setComments] = useState<Array<iComment>>()
  useEffect(() => {
    setComments(data)
  }, [data])
  const handleDelete = (text: string, id: number) => {
    redaxios.delete(`http://localhost:6060/posts/comment?text=${text}&id=${id}`).then((response) => {
      if (response.status === 200) {
        refetch()
      }
    })
  }
  return (
    <>
      {data == 0 ? (
        <div className='p-12px text-center text-gray-400'>Нет комментариев</div>
      ) : (
        <div>
          {comments !== undefined &&
            comments.map((item: iComment) => (
              <div className='w-full flex flex-row mb-16px border-b-2 border-gray-300'>
                <img className='ml-24px mr-16px h-54px rounded-xl w-54px' src={item.userImg} alt=' ' />
                <div className='flex-col '>
                  <div className='flex items-center align-center  -mt-4px'>
                    <div className='text-lg md:text-xl  font-bold' onClick={() => navigate(`/${item.author}`)}>
                      {item.username}
                    </div>
                    <p className='ml-8px font-bold text-md text-gray-500'>@{item.author}</p>
                    <p className='ml-8px font-bold text-md text-gray-500'>24ч</p>
                  </div>
                  <div className='mt-4px mb-12px'>{item.text}</div>
                  {item.commentImg !== '' && (
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
                  )}
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  )
}

export default CComments
