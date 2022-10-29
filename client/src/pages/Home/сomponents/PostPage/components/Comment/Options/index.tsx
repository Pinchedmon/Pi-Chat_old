import { DotsVerticalIcon, TrashIcon } from '@heroicons/react/solid'
import React, { useState } from 'react'
import { Ioptions } from '../../../types/options.interface'
import { handleDelete } from './utils/handleDelete'

const Options = (props: Ioptions) => {
  const [showOptions, setShowOptions] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  return (
    <>
      <div
        className='postPage-options'
        onMouseEnter={() => setShowOptions(true)}
        onMouseLeave={() => setShowOptions(false)}
      >
        <DotsVerticalIcon className='postPage-options-icon' />
        {showOptions && (
          <div className='postPage-show-options'>
            <button className='postPage-show-options__button' onClick={() => setShowWarning(true)}>
              <TrashIcon className='postPage-show-options__img' /> <p className='postPage-show-options__p'>Удалить</p>
            </button>
          </div>
        )}
      </div>
      {showWarning && (
        <>
          <div className='postPage-warning-back'></div>
          <div className='postPage-warning'>
            <div className='postPage-warning-ask'>Вы действительно уверены, что хотите удалить комментарий?</div>
            <button
              className='postPage-warning__button'
              onClick={() => {
                setShowWarning(false)
                handleDelete(props.id, props.postId, props.refetch)
              }}
            >
              Да
            </button>
            <button
              className='postPage-warning__button ml-5px bg-gray-600 float-right '
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
