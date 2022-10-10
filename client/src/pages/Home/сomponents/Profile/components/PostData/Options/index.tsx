import { DotsVerticalIcon, TrashIcon } from '@heroicons/react/solid'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { deletePost } from './utils/deletePost'
function Options(props: { id: number }) {
  const [showOptions, setShowOptions] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  const { refetch } = useQuery('userData')
  return (
    <>
      <div
        className='self-start right-16px absolute justify-end p-8px'
        onMouseEnter={() => setShowOptions(true)}
        onMouseLeave={() => setShowOptions(false)}
      >
        <DotsVerticalIcon className='w-24px hover:text-green-600' />
        {showOptions && (
          <div className='absolute bg-white rounded-lg border-green-600 w-180px border-2 -right-5px  mt-4px p-5px text-center'>
            <button className='flex text-red-600 font-bold' onClick={() => setShowWarning(true)}>
              <TrashIcon className='w-24px' /> <p className='ml-5px'>Удалить пост</p>
            </button>
          </div>
        )}
      </div>
      {showWarning && (
        <>
          <div className='backdrop-blur-sm w-full h-full absolute top-0px'></div>
          <div className='absolute left-20% right-20% text-xl rounded-xl bottom-2/3 p-10px font-bold bg-white border-3 border-green-600 '>
            <div className='mb-16px'>Вы действительно уверены, что хотите удалить пост?</div>
            <button
              className='pl-10px pr-10px pt-4px pb-4px bg-red-600 rounded-lg text-white'
              onClick={() => {
                setShowWarning(false)
                deletePost({ id: props.id, refetch: refetch })
              }}
            >
              Да
            </button>
            <button
              className='pl-10px pr-10px pt-4px pb-4px ml-5px bg-gray-600 text-white rounded-lg float-right'
              onClick={() => setShowWarning(false)}
            >
              Нет
            </button>
          </div>
        </>
      )}
    </>
  )
}

export default Options
