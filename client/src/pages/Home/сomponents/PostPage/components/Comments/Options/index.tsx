import { DotsVerticalIcon, TrashIcon } from '@heroicons/react/solid'
import React, { useState } from 'react'
import Modal from '../../../../../../../components/ux/Modal'
import Warning from '../../../../../../../components/ux/Warning'
import { Ioption, Ioptions } from '../../../types/options.interface'
import { handleDelete } from './utils/handleDelete'
const Options = (props: Ioptions) => {
  const [option, setOption] = useState<Ioption>({ showOptions: false, showWarning: false })
  return (
    <>
      <Modal open={option.showWarning} isClose={() => setOption({ ...option, showWarning: false })}>
        <Warning
          propsFunc={() => handleDelete(props.id, props.postId, props.refetch)}
          setIsOpen={() => setOption({ ...option, showWarning: false })}
          title={'Вы действительно хотите удалить комментарий?'}
        />
      </Modal>
      <div
        className='postPage-options'
        onMouseEnter={() => setOption({ ...option, showOptions: true })}
        onMouseLeave={() => setOption({ ...option, showOptions: false })}
      >
        <DotsVerticalIcon className='postPage-options-icon' />
        {option.showOptions && (
          <div className='postPage-show-options'>
            <button
              className='postPage-show-options__button'
              onClick={() => setOption({ ...option, showWarning: true })}
            >
              <TrashIcon className='postPage-show-options__img' /> <p className='postPage-show-options__p'>Удалить</p>
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default Options
