import React, { useState } from 'react'
import { DotsVerticalIcon, TrashIcon } from '@heroicons/react/solid'
import { deleteDialog } from './utils/deleteDialog'
import { Ioptions } from '../../types/options.interface'
import Warning from '../../../../../../components/ux/Warning'
import Modal from '../../../../../../components/ux/Modal'

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
          <Modal open={showWarning} onClose={() => setShowWarning(false)}>
            <Warning
              setIsOpen={() => setShowWarning(false)}
              propsFunc={() => deleteDialog({ names: props.names, refetch: props.refetch })}
              title={'Вы действительно уверены, что хотите удалить диалог?'}
            />
          </Modal>
        </>
      )}
    </>
  )
}

export default Options
