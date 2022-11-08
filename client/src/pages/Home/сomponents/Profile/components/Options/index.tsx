import React, { useState } from 'react'
import { ChatAlt2Icon, DotsVerticalIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import Modal from '../../../../../../components/ux/Modal'
import EditProfile from '../EditProfile'
import AddMessage from '../AddMessage'
export interface Ioptions {
  userName: string
  profileName: string
  refetch: () => void
}

export interface Ioption {
  showOptions: boolean
  showWarning: boolean
  isOpenMsg: boolean
  isOpenEdit: boolean
}
function Options(props: Ioptions) {
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
      <div
        className='self-start right-16px absolute justify-end p-8px'
        onMouseEnter={() => setOption({ ...option, showOptions: true })}
        onMouseLeave={() => setOption({ ...option, showOptions: false })}
      >
        <DotsVerticalIcon className='w-24px hover:text-green-600' />
        {option.showOptions && (
          <div className='absolute bg-white rounded-lg border-green-600 w-180px border-2 -right-5px  mt-4px p-5px  text-center'>
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
      {option.showWarning && (
        <>
          <div className='backdrop-blur-sm w-full h-full absolute top-0px'></div>
          <div className='sticky text-xl rounded-xl bottom-2/3 p-10px font-bold bg-white border-3 border-green-600 '>
            <div className='mb-16px'>Вы действительно уверены, что хотите заблокировать этого человека?</div>
            <button
              className='pl-10px pr-10px pt-4px pb-4px bg-red-600 rounded-lg text-white'
              onClick={() => {
                setOption({ ...option, showWarning: false })
              }}
            >
              Да
            </button>
            <button
              className='pl-10px pr-10px pt-4px pb-4px ml-5px bg-gray-600 text-white rounded-lg float-right'
              onClick={() => setOption({ ...option, showWarning: false })}
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
