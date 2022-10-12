import { DotsVerticalIcon, TrashIcon } from '@heroicons/react/solid'
import React, { useState } from 'react'
import redaxios from 'redaxios'
function Options(props: { id: number; postId: number; refetch: () => void }) {
  const [showOptions, setShowOptions] = useState(false)
  const [showWarning, setShowWarning] = useState(false)

  const handleDelete = (id: number, postId: number) => {
    redaxios.delete(`http://localhost:6060/comment?postId=${postId}&id=${id}`).then((response) => {
      if (response.status === 200) {
        props.refetch()
      }
    })
  }
  return (
    <>
      <div
        className='right-16px top-0px absolute p-8px'
        onMouseEnter={() => setShowOptions(true)}
        onMouseLeave={() => setShowOptions(false)}
      >
        <DotsVerticalIcon className='w-24px hover:text-green-600' />
        {showOptions && (
          <div className='absolute bg-white rounded-lg border-green-600  border-2 -right-5px  mt-4px p-5px text-center'>
            <button className='flex text-red-600 font-bold' onClick={() => setShowWarning(true)}>
              <TrashIcon className='w-24px' /> <p className='ml-5px mr-5px'>Удалить</p>
            </button>
          </div>
        )}
      </div>
      {showWarning && (
        <>
          <div className=' w-full h-full absolute top-0px'></div>
          <div className='absolute left-20% right-20% text-xl rounded-xl bottom-2/3 p-10px font-bold bg-white border-3 border-green-600 '>
            <div className='mb-16px'>Вы действительно уверены, что хотите удалить комментарий?</div>
            <button
              className='pl-10px pr-10px pt-4px pb-4px bg-red-600 rounded-lg text-white'
              onClick={() => {
                setShowWarning(false)
                handleDelete(props.id, props.postId)
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
