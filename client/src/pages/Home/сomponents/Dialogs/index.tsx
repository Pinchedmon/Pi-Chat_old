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
import { formatLeft } from '../../../../utils/dates'
import { setActiveDialog } from '../../../../state/messageReducer'

const Dialogs = () => {
  const user = useContext(UserContext)
  const navigate = useNavigate()
  const { data, refetch } = useQuery(['dialogs'], () => getDialogs(user.name))
  const [names, setNames] = useState<string>('')
  const visible = useSelector((state: Istore) => state.nav.messageStyle)
  const dispatch = useDispatch()
  const deleteDialog = (x: string) => {
    // let a = dialogs
    // a = a.filter((dlg: any) => dlg.names !== x)
    // console.log(a)
    // setDialogs(a)
    refetch()
  }
  useEffect(() => {
    refetch()
    dispatch(setMessageStyle(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {data && (
        <div className='w-full h-screen'>
          {!visible && (
            <>
              <div className='dialogs'>
                <p className='dialogs-title'>Диалоги</p>
              </div>
              {data.length > 0 ? (
                data.map((item: Idialogs, index: number) => (
                  <div key={index} className='dialogs-dialog'>
                    <div
                      onClick={() => {
                        dispatch(setMessageStyle(!visible))
                        dispatch(setIsMenuShowed(false))
                        setNames(item.names)
                        dispatch(
                          setActiveDialog({ avatar: item.backImg, name: item.names.replace(user.name, '').trim() }),
                        )
                      }}
                      className='dialogs-dialog-info'
                    >
                      <img
                        onClick={() => navigate('')}
                        alt=''
                        className='dialogs-dialog-info__img'
                        src={item.backImg}
                      />
                      <div className='flex-col '>
                        <div className='flex items-center align-center  -mt-4px'>
                          <div onClick={() => navigate('')} className='dialogs-dialog-info-name'>
                            {item.names.replace(user.name, '').trim()}
                          </div>
                          <p className='dialogs-dialog-info-time'>{item.date !== '' ? formatLeft(item.date) : ''}</p>
                        </div>
                        <div className='dialogs-dialog-info-last'>{item.last}</div>
                      </div>
                    </div>
                    <Options names={item.names} refetchDialogs={deleteDialog} />
                  </div>
                ))
              ) : (
                <div className='no-dialog'>Нет сообщений</div>
              )}
            </>
          )}
          {visible && (
            <div className='dialogs-info'>
              <Dialog names={names} visible={visible} dispatch={dispatch} refetchDialogs={refetch} />
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default Dialogs
