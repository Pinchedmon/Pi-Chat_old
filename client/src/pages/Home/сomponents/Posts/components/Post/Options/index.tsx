import React, { useState } from 'react'
import { DotsVerticalIcon, TrashIcon } from '@heroicons/react/solid'
import { Ioptions } from '../../../types/post.interface'
import { deletePost } from './utils/deletePost'

const Options = (props: Ioptions) => {
  const [showOptions, setShowOptions] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  return (
    <>
      <div
        className='post__option'
        onMouseEnter={() => setShowOptions(true)}
        onMouseLeave={() => setShowOptions(false)}
      >
        <DotsVerticalIcon className='post__option-icon' />
        {showOptions && (
          <div className='post__option-area'>
            <button className='flex text-red-600 font-bold' onClick={() => setShowWarning(true)}>
              <TrashIcon className='w-24px' /> <p className='ml-5px'>Удалить пост</p>
            </button>
          </div>
        )}
      </div>
      {showWarning && (
        <>
          <div className='post__warning-background'>
            <div className='post__warning'>
              <div className='post__warning-title'>Вы действительно уверены, что хотите удалить пост?</div>
              <button
                className='post__warning__button-yes'
                onClick={() => {
                  setShowWarning(false)
                  deletePost({ id: props.id, refetch: props.refetch })
                }}
              >
                Да
              </button>
              <button className='post__warning__button-no' onClick={() => setShowWarning(false)}>
                Нет
              </button>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Options
