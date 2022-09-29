import React, { useState } from 'react'
import { ChatAlt2Icon, DotsVerticalIcon, PencilAltIcon, TrashIcon, UserAddIcon } from '@heroicons/react/solid'
import { useDispatch } from 'react-redux'
import { setAddMessageStyle, setEditProfileStyle } from '../../../../../../state/navReducer'
import redaxios from 'redaxios'
function Options(props: { id: number; userName: string; profileName: string }) {
  const dispatch = useDispatch()
  const { id, userName, profileName } = props
  const [showOptions, setShowOptions] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  const handleFollow = (name: string, object: string) => {
    redaxios.post(`http://localhost:6060/follow/follow?name=${name}&object=${object}`)
  }
  return (
    <>
      <div
        className='self-start right-16px absolute justify-end p-8px'
        onMouseEnter={() => setShowOptions(true)}
        onMouseLeave={() => setShowOptions(false)}
      >
        <DotsVerticalIcon className='w-24px hover:text-green-600' />
        {showOptions && (
          <div className='absolute bg-white rounded-lg border-green-600 w-180px border-2 -right-5px  mt-4px p-5px  text-center'>
            {userName === profileName ? (
              <>
                <button className='flex font-bold  items-center' onClick={() => dispatch(setEditProfileStyle(true))}>
                  <PencilAltIcon className='w-18px' /> <p className='ml-16px center'>Редактировать</p>
                </button>
              </>
            ) : (
              <>
                <button className='flex text-red-600 font-bold' onClick={() => setShowWarning(true)}>
                  <TrashIcon className='w-24px' /> <p className='ml-2px'>Заблокировать</p>
                </button>
                <button
                  className='flex mb-6px items-center font-bold'
                  onClick={() => dispatch(setAddMessageStyle(true))}
                >
                  <ChatAlt2Icon className='w-24px mr-8px  ' />
                  <p className='ml-2px text-md'>Написать сообщение</p>
                </button>
                <button
                  className='flex mb-6px items-center font-bold'
                  onClick={() => handleFollow(userName, profileName)}
                >
                  <UserAddIcon className='w-24px mr-8px  ' />
                  <p className='ml-2px text-md'>Подписаться</p>
                </button>
              </>
            )}
          </div>
        )}
      </div>
      {showWarning && (
        <>
          <div className='backdrop-blur-sm w-full h-full absolute top-0px'></div>
          <div className='absolute left-20% right-20% text-xl rounded-xl bottom-2/3 p-10px font-bold bg-white border-3 border-green-600 '>
            <div className='mb-16px'>Вы действительно уверены, что хотите заблокировать этого человека?</div>
            <button
              className='pl-10px pr-10px pt-4px pb-4px bg-red-600 rounded-lg text-white'
              onClick={() => {
                setShowWarning(false)
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
