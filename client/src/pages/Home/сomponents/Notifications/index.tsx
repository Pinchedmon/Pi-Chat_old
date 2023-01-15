import React, { useContext } from 'react'
import { useQuery } from 'react-query'
import { SocketContext } from '../..'
import { getNotifications } from '../../../../api/get'
import { UserContext } from '../../../../App'
interface Inotifs {
  receiverName: string
  senderName: string
  type: number
  object: string | number
  read: number
}

const Notifications = () => {
  const socket = useContext(SocketContext)
  const user = useContext(UserContext)
  const { data, refetch } = useQuery(['notifs'], () =>
    getNotifications(user.name).then((res) => {
      if (res.status === 200) {
        return res.data
      }
    }),
  )
  const renderSwitch = (param: number) => {
    switch (param) {
      case 1:
        return 'понравился пост'
      case 2:
        return 'понравился комментарий'
      case 3:
        return 'подписался(ась)'
      case 4:
        return 'упомянул(а) вас'
    }
  }
  return (
    <div className='h-screen'>
      {data && (
        <>
          {data.map((item: Inotifs, index: number) => (
            <div key={index} className='rounded-xl border font-bold border-gray-300 p-16px mb-6px'>
              {item.senderName} {renderSwitch(item.type)}
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default Notifications
