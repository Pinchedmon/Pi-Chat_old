import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { setIsMenuShowed, setMessageStyle } from '../../../../state/navReducer'
import { getDialogs } from '../../../../api/get'
import { UserContext } from '../../../../App'
import { Istore } from '../../../../types/store.interface'
import Options from './сomponents/Options'
import Dialog from './сomponents/Dialog'
import { Idialogs } from './types/dialogs.interface'
import { useNavigate } from 'react-router-dom'

const Dialogs = () => {
  const user = useContext(UserContext)
  const navigate = useNavigate()
  const { data, refetch } = useQuery(['messages'], () => getDialogs(user.name), {})
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
          <div className='dialogs'>
            <p className='dialogs-title'>Диалоги</p>
          </div>
          {data && data.data.length > 0 ? (
            data.data.map((item: Idialogs, index: number) => (
              <div key={index} className='dialogs-dialog'>
                <div
                  onClick={() => {
                    dispatch(setMessageStyle(!visible))
                    dispatch(setIsMenuShowed(false))
                    setNames(item.names)
                  }}
                  className='dialogs-dialog-info'
                >
                  <img onClick={() => navigate('')} alt='' className='dialogs-dialog-info__img' src={item.backImg} />
                  <div className='flex-col '>
                    <div className='flex items-center align-center  -mt-4px'>
                      <div onClick={() => navigate('')} className='dialogs-dialog-info-name'>
                        {item.names.replace(user.name, '').trim()}
                      </div>
                      <p className='dialogs-dialog-info-time'>24z</p>
                    </div>
                    <div className='dialogs-dialog-info-last'>{item.last}</div>
                  </div>
                </div>
                <Options names={item.names} refetch={refetch} />
              </div>
            ))
          ) : (
            <div className='no-dialog'>Нет сообщений</div>
          )}
        </>
      )}
      {visible && (
        <div className='dialogs-info'>
          <Dialog names={names} visible={visible} dispatch={dispatch} />
        </div>
      )}
    </div>
  )
}

export default Dialogs
