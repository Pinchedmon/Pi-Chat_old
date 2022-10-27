import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { setMessageStyle } from '../../../../state/navReducer'
import { getDialogs } from '../../../../api/get'
import { UserContext } from '../../../../App'
import { Istore } from '../../../../types/store.interface'
import Options from './сomponents/Options'
import Dialog from './сomponents/Dialog'
import { Idialogs } from './types/dialogs.interface'

const Dialogs = () => {
  const user = useContext(UserContext)
  const { data, refetch } = useQuery('messages', () => getDialogs(user.name), {})
  const [names, setNames] = useState<string>('')
  const visible = useSelector((state: Istore) => state.nav.messageStyle)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setMessageStyle(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className='w-full h-screen'>
      {!visible && (
        <>
          {/* Dialogs */}
          <div className='w-full  border-b-2 border-green-600 p-10px'>
            {/* Title naming */}
            <p className='text-2xl rounded-xl text-center  top-16px font-bold'>Диалоги</p>
          </div>
          {data !== undefined && data.data.length > 0 ? (
            data.data.map((item: Idialogs, index: number) => (
              <div
                key={index}
                className='w-full  flex border-b-2 border-gray-300 hover:border-green-600 hover:bg-gray-100'
              >
                <div
                  onClick={() => {
                    dispatch(setMessageStyle(!visible))
                    setNames(item.names)
                  }}
                  className='w-full flex mt-10px flex-row pb-10px'
                >
                  <img
                    onClick={() => 1}
                    alt=''
                    className='ml-24px mr-16px h-54px rounded-xl w-54px'
                    src={item.backImg}
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
      {/* Dialog with messages */}
      {visible === true && (
        <div className='flex flex-col w-full h-full items-stretch'>
          <Dialog names={names} visible={visible} dispatch={dispatch} />
        </div>
      )}
    </div>
  )
}

export default Dialogs
