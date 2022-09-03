import { ArrowLeftIcon } from '@heroicons/react/solid'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Img from '../../../components/Img'
import useAuth from '../../../hooks/useAuth'
import { setMessageStyle } from '../../../state/navReducer'

import Buttons from './Messages/Buttons'
import { getMessages } from '../../../api/get'
import Options from './Options'
import Messages from './Messages/Messages'
interface IState {
  nav: {
    messageStyle: boolean
  }
}
interface iMessage {
  names: string
  last: string
}
function Dialogs() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const { data, refetch } = useQuery('messages', () => getMessages(user.name), {})
  const [names, setNames] = useState<any>(false)
  const visible = useSelector((state: IState) => state.nav.messageStyle)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setMessageStyle(false))
  }, [])
  return (
    <div className='w-full h-screen'>
      {!visible && (
        <>
          <div className='w-full  border-b-2 border-green-600 p-10px '>
            <p className='text-2xl rounded-xl text-center  top-16px font-bold'>Диалоги</p>
          </div>
          {data !== undefined && data.data.length > 0 ? (
            data.data.map((item: iMessage) => (
              <div className='w-full  flex border-b-2 border-gray-300 hover:border-green-600 hover:bg-gray-100'>
                <div
                  onClick={() => {
                    dispatch(setMessageStyle(!visible))
                    setNames(item.names)
                  }}
                  className='w-full flex mt-10px flex-row'
                >
                  <Img
                    onClick={() => 1}
                    className='ml-24px mr-16px h-54px rounded-xl w-54px'
                    name={item.names.replace(user.name, '').trim()}
                  />
                  <div className='flex-col '>
                    <div className='flex items-center align-center  -mt-4px'>
                      <div onClick={() => 1} className='text-lg md:text-xl font-bold'>
                        {item.names.replace(user.name, '').trim()}
                      </div>
                      <p className='ml-8px font-bold text-md text-gray-500'>24ч</p>
                    </div>
                    <div className='mt-4px mb-12px'>{item.last}</div>
                  </div>
                </div>
                <Options names={item.names} refetch={refetch} />
              </div>
            ))
          ) : (
            <div className='p-12px text-center text-gray-400'>Нет сообщений</div>
          )}
        </>
      )}

      {visible === true && (
        <div className='flex flex-col w-full h-full items-stretch'>
          <div className='w-full  border-b-2  border-green-600 p-10px '>
            <ArrowLeftIcon
              onClick={() => dispatch(setMessageStyle(!visible))}
              className='w-48px text-green-600 rounded-md bg-gray-100 p-6px hover:bg-green-600 hover:text-white'
            />
            <p className='absolute left-1/2 -translate-x-1/2 text-2xl rounded-xl top-16px font-bold'>
              {names.replace(user.name, '')}
            </p>
          </div>

          <div className='overflow-y-scroll overflow-visible h-full  '>
            <Messages names={names} />
          </div>
          <div className=''>
            <Buttons firstName={user.name} secondName={names.replace(user.name, '')} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Dialogs
