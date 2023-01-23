import React, { useContext, useEffect, useState } from 'react'
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline'
import { useQuery } from 'react-query'
import { getNotifications } from '../../../../api/get'
import { readNotify } from '../../../../api/post'
import { UserContext } from '../../../../App'
import { formatLeft } from '../../../../utils/dates'
import { useNavigate } from 'react-router-dom'
interface Inotifs {
  receiverName: string
  senderName: string
  type: number
  object: string | number
  read: number
  date: string
  username: string
  pathImg: string
  objectImg: string
  objectText: string
}

const Notifications = () => {
  const [notifications, setNotifications] = useState([])
  const user = useContext(UserContext)
  const navigate = useNavigate()
  const { data, refetch } = useQuery(['notifs'], () =>
    getNotifications(user.name).then((res) => {
      if (res.status === 200) {
        setNotifications(res.data)
        return res.data
      }
    }),
  )
  const renderSwitch = (param: number) => {
    switch (param) {
      case 1:
        return 'оценил(а) ваш пост'
      case 2:
        return 'оценил(а) ваш комментарий'
      case 3:
        return 'подписался(ась)'
      case 4:
        return 'упомянул(а) вас'
    }
  }
  const navigateSwitch = (param: number, item: Inotifs) => {
    switch (param) {
      case 1:
        return navigate(`/post?id=${item.object}`)
      case 2:
        return navigate(`/post?id=${item.object}`)
      case 3:
        return 'подписался(ась)'
      case 4:
        return navigate(`/post?id=${item.object}`)
    }
  }
  useEffect(() => {
    if (notifications.length > 0) {
      readNotify(
        () => {
          refetch()
          user.refetchUser()
        },
        notifications.filter((item: Inotifs) => {
          return item.read === 0
        }),
      )
    }
  }, [notifications.length])
  return (
    <div className='h-screen'>
      {data && (
        <>
          <div className='dialogs mb-8px'>
            <p className='dialogs-title'>Уведомления</p>
          </div>
          {notifications.map((item: Inotifs, index: number) => (
            <div key={index} className='mb-6px'>
              <div className='justify-between flex rounded-xl border border-gray-300 p-10px    '>
                <div className='flex'>
                  <img
                    className='post__img'
                    alt=''
                    onClick={() => navigate(`/${item.senderName}`)}
                    src={item.pathImg}
                  />
                  <div>
                    <span onClick={() => navigate(`/${item.senderName}`)} className='font-bold hover:cursor-pointer'>
                      {`${item.username}`}{' '}
                    </span>
                    <p className='w-full'>{`${renderSwitch(item.type)}`}</p>
                  </div>
                </div>
                <div className='text-gray-400'>
                  {formatLeft(item.date)}
                  {item.read === 1 ? <EyeIcon className='w-16px' /> : <EyeOffIcon className='w-16px' />}
                </div>
              </div>
              {item.objectText && (
                <div
                  onClick={() => navigateSwitch(item.type, item)}
                  className='ml-40px flex rounded-xl border-b border-l border-r hover:cursor-pointer border-gray-300 p-8px  mb-6px '
                >
                  <img className='post__img' alt='' src={item.type === 2 ? user.pathImg : item.pathImg} />
                  <div>
                    <div className='font-bold'>{item.type === 2 ? item.receiverName : item.senderName}</div>
                    <p> {item.objectText}</p>
                  </div>
                  {item.objectImg && <img className='post__img' alt='' src={item.objectImg} />}
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default Notifications
