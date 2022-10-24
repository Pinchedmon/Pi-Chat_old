import React from 'react'
import { Icomment } from '../../types/comment.interface'
import Options from './Options'

function CComments(props: { data: Array<Icomment>; refetch: () => void }) {
  const { data, refetch } = props
  return (
    <>
      {data === undefined ? (
        <div className='p-12px text-center text-gray-400'>Нет комментариев</div>
      ) : (
        <div>
          {data !== undefined &&
            data.map((item: Icomment, index: number) => (
              <div key={index} className='w-full flex flex-row mb-16px border-b-2 border-gray-300 relative '>
                <img
                  src={item.img}
                  className={'ml-24px mr-16px h-54px rounded-3xl w-54px'}
                  onClick={undefined}
                  alt=''
                />
                <div className='flex-col '>
                  <div className='flex items-center align-center  -mt-4px'>
                    <div className='text-lg md:text-xl  font-bold'>{item.username}</div>
                    <p className='ml-8px font-bold text-md text-gray-500'>
                      {item.date === new Date().toLocaleDateString() ? item.time : item.date}
                    </p>
                  </div>
                  <div className='mt-4px mb-12px'>{item.text}</div>
                  <Options id={item.ID} postId={item.postId} refetch={refetch} />
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
