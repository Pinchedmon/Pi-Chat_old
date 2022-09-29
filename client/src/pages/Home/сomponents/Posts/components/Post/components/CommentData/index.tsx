import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { getComments } from '../../../../../../../../api/get'
import Img from '../../../../../../../../components/ui/Img'
import Username from '../../../../../../../../components/ui/Username'
import Options from './Options'

type iComment = {
  ID: number
  postId: number
  name: string
  text: string
  commentImg: string
  date: string
  time: string
}

function CComments(props: { getObject: any; role: string }) {
  const { getObject } = props
  const { data } = useQuery('comments', () => getComments(getObject), {})
  const [comments, setComments] = useState<Array<iComment>>()
  useEffect(() => {
    setComments(data)
  }, [data])

  return (
    <>
      {data == 0 ? (
        <div className='p-12px text-center text-gray-400'>Нет комментариев</div>
      ) : (
        <div>
          {comments !== undefined &&
            comments.map((item: iComment) => (
              <div className='w-full flex flex-row mb-16px border-b-2 border-gray-300 relative '>
                <Img
                  name={`${item.name}`}
                  className={'ml-24px mr-16px h-54px rounded-3xl w-54px'}
                  onClick={undefined}
                />
                <div className='flex-col '>
                  <div className='flex items-center align-center  -mt-4px'>
                    <div className='text-lg md:text-xl  font-bold'>
                      <Username name={item.name} />
                    </div>

                    <p className='ml-8px font-bold text-md text-gray-500'>
                      {item.date === new Date().toLocaleDateString() ? item.time : item.date}
                    </p>
                  </div>
                  <div className='mt-4px mb-12px'>{item.text}</div>
                  <Options id={item.ID} postId={item.postId} />
                  {item.commentImg !== '' && (
                    <div className='mb-12px'>
                      <img className='w-1/2 rounded-xl' src={item.commentImg} alt='загружается...' />
                    </div>
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
