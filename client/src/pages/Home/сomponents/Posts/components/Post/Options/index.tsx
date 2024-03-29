import React, { useState } from 'react'
import { DotsVerticalIcon, TrashIcon } from '@heroicons/react/solid'
import { Ioption, Ioptions } from '../../../types/post.interface'
import Modal from '../../../../../../../components/ux/Modal'
import Warning from '../../../../../../../components/ux/Warning'
import { deletePost } from './utils/deletePost'

const Options = (props: Ioptions) => {
  const [option, setOption] = useState<Ioption>({ showOptions: false, showWarning: false })
  return (
    <>
      <Modal open={option.showWarning} onClose={() => setOption({ ...option, showWarning: false })}>
        <Warning
          setIsOpen={() => {
            setOption({ ...option, showWarning: false })
          }}
          propsFunc={() => {
            deletePost({ id: props.id, refetch: props.deletePost })
          }}
          title={'Вы действительно хотите удалить пост?'}
        />
      </Modal>
      <div
        className='post__option'
        onMouseEnter={() => setOption({ ...option, showOptions: true })}
        onMouseLeave={() => setOption({ ...option, showOptions: false })}
      >
        <DotsVerticalIcon className='post__option-icon' />
        {option.showOptions && (
          <div className='post__option-area'>
            <button className='flex text-red-600 font-bold' onClick={() => setOption({ ...option, showWarning: true })}>
              <TrashIcon className='w-16px lg:w-24px' /> <p className='ml-5px'>Удалить пост</p>
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default Options
