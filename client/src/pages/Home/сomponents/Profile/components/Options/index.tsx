import React, { useState } from 'react'
import { ChatAlt2Icon, DotsVerticalIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import Modal from '../../../../../../components/ux/Modal'
import EditProfile from '../EditProfile'
import AddMessage from '../AddMessage'
import Warning from './components/Warning'
import { Ioption, Ioptions } from '../../types/options.interface'

const Options = (props: Ioptions) => {
  const { userName, profileName, refetch } = props
  const [option, setOption] = useState<Ioption>({
    showOptions: false,
    showWarning: false,
    isOpenMsg: false,
    isOpenEdit: false,
  })
  return (
    <>
      <Modal open={option.isOpenMsg} onClose={() => setOption({ ...option, isOpenMsg: false })}>
        <AddMessage name={profileName} setIsOpen={() => setOption({ ...option, isOpenMsg: false })} />
      </Modal>
      <Modal open={option.isOpenEdit} onClose={() => setOption({ ...option, isOpenEdit: false })}>
        <EditProfile refetch={refetch} setIsOpen={() => setOption({ ...option, isOpenEdit: false })} />
      </Modal>
      <Modal open={option.showWarning} onClose={() => setOption({ ...option, showWarning: false })}>
        <Warning setIsOpen={() => setOption({ ...option, showWarning: false })} />
      </Modal>
      <div
        className='profile-options'
        onMouseEnter={() => setOption({ ...option, showOptions: true })}
        onMouseLeave={() => setOption({ ...option, showOptions: false })}
      >
        <DotsVerticalIcon className='profile-options-icon' />
        {option.showOptions && (
          <div className='profile-options-area'>
            {userName === profileName ? (
              <>
                <button
                  className='flex font-bold  items-center'
                  onClick={() => setOption({ ...option, isOpenEdit: true })}
                >
                  <PencilAltIcon className='w-18px' /> <p className='ml-16px center'>Редактировать</p>
                </button>
              </>
            ) : (
              <>
                <button
                  className='flex text-red-600 font-bold'
                  onClick={() => setOption({ ...option, showWarning: true })}
                >
                  <TrashIcon className='w-24px' /> <p className='ml-2px'>Заблокировать</p>
                </button>
                <button
                  className='flex mb-6px items-center font-bold'
                  onClick={() => setOption({ ...option, isOpenMsg: true })}
                >
                  <ChatAlt2Icon className='w-24px mr-8px  ' />
                  <p className='ml-2px text-md'>Написать сообщение</p>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default Options
