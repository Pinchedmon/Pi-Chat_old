import React, { useState } from 'react'
import { DotsVerticalIcon, TrashIcon } from '@heroicons/react/solid'
import { deleteDialog } from './utils/deleteDialog'
import { Ioptions } from '../../types/options.interface'

const Options = (props: Ioptions) => {
  const [showOptions, setShowOptions] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  return (
    <>
      <div
        className='dialogs-options'
        onMouseEnter={() => setShowOptions(true)}
        onMouseLeave={() => setShowOptions(false)}
      >
        <DotsVerticalIcon className='dialogs-options-icon ' />
        {showOptions && (
          <div className='dialogs-options-show'>
            <button className='flex text-red-600 font-bold' onClick={() => setShowWarning(true)}>
              <TrashIcon className='dialogs-options-delete-icon' /> <p className='ml-5px'>Удалить</p>
            </button>
          </div>
        )}
      </div>
      {showWarning && (
        <>
          <div className='dialogs-show-warning-back'></div>
          <div className='dialogs-show-warning'>
            <div className='mb-16px'>Вы действительно уверены, что хотите удалить диалог?</div>
            <button
              className='dialogs-show-warning-yes'
              onClick={() => {
                setShowWarning(false)
                deleteDialog({ names: props.names, refetch: props.refetch })
              }}
            >
              Да
            </button>
            <button className='dialogs-show-warning-no' onClick={() => setShowWarning(false)}>
              Нет
            </button>
          </div>
        </>
      )}
    </>
  )
}

export default Options
