import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useLocation } from 'react-router-dom'
import Nav from './сomponents/Nav'
import FilterModal from './сomponents/Nav/сomponents/FilterModal'
import PostPage from './сomponents/PostPage'
import Profile from './сomponents/Profile'
import Posts from './сomponents/Posts'
import Messages from './сomponents/Dialogs'
import { UserContext } from '../../App'
import { Istore } from '../../types/store.interface'
import Subscribes from './сomponents/Subscribes'
import Setting from './сomponents/Settings'
import useDarkMode from '../../hooks/useDarkMode'
import Notifications from './сomponents/Notifications'
import { setIsNavExpanded } from '../../state/navReducer'
import Modal from '../../components/ux/Modal'
import { MenuIcon } from '@heroicons/react/outline'
import { io } from 'socket.io-client'
import Search from './сomponents/Search'

export const SocketContext = React.createContext(null)
const Home = () => {
  const user = useContext(UserContext)
  const [socket, setSocket] = useState(null)
  const [] = useDarkMode()
  const nav = useSelector((state: Istore) => state.nav)
  const dispatch = useDispatch()
  const location = useLocation()
  const [notifications, setNotifications] = useState([])
  const [openedNotifs, setOpenedNotifications] = useState(false)

  const displayNotifications = ({ senderName, type }: any) => {
    let action: string
    switch (type) {
      case 1:
        action = 'лайкнул(а) ваш пост'
        break
      case 2:
        action = 'лайкнул(а) ваш комментарий'
        break
      case 3:
        action = 'подписался(ась)'
        break
      case 4:
        action = 'ответил(а) на ваш комментарий'
    }
    return <span>{` ${senderName} ${action}`}</span>
  }
  const handleRead = () => {
    setOpenedNotifications(false)
    setNotifications([])
  }
  useEffect(() => {
    if (window.innerHeight > 1024) {
      dispatch(setIsNavExpanded(true))
    } else {
      dispatch(setIsNavExpanded(false))
    }
  }, [window.innerWidth])
  useEffect(() => {
    setSocket(io('http://localhost:6060'))
  }, [])
  useEffect(() => {
    if (user !== undefined) {
      socket?.emit('newUser', user.name)
    }
  }, [socket, user])
  useEffect(() => {
    socket?.on('getNotification', (data: any) => {
      setOpenedNotifications(true)
      setNotifications((prev: any) => [...prev, data])
    })
  }, [socket])
  return (
    <div className='home'>
      {user && (
        <>
          {openedNotifs && (
            <div className='notification flex flex-col' onClick={handleRead}>
              {notifications.map((n: any, index: number) => (
                <div key={index}>{displayNotifications(n)}</div>
              ))}
              <button className='notifsButton'>Отметить как прочитанное</button>
            </div>
          )}
          {window.innerWidth >= 1024 ? (
            <Nav />
          ) : nav.isNavExpanded ? (
            <Modal open={nav.isNavExpanded}>
              <div className='bg-white dark:bg-black p-16px border rounded-xl'>
                <Nav />
              </div>
            </Modal>
          ) : (
            ''
          )}
          <div className='content-area '>
            {window.innerWidth < 1024 && nav.isMenuShowed && (
              <div className='z-[100] sticky justify-center w-full top-0px flex items-center align-center p-12px bg-[#20A740] text-white h-64px text-lg'>
                <p className='text-center font-bold text-3xl'> / π /</p>
                <button
                  className={window.innerWidth > 1024 || nav.isNavExpanded ? `hidden` : `absolute right-12px top-1/3`}
                  onClick={() => {
                    dispatch(setIsNavExpanded(true))
                  }}
                >
                  <MenuIcon className='w-24px' />
                </button>
              </div>
            )}
            {window.innerWidth < 1024 && location.pathname === '/' && (
              <FilterModal category={nav.category} sort={nav.sort} dispatch={dispatch} />
            )}
            <div className=''>
              <SocketContext.Provider value={socket}>
                <Routes>
                  <Route path='/' element={<Posts sort={nav.sort} category={nav.category} name={user.name} />} />
                  <Route path='/post' element={<PostPage />} />
                  <Route path='/*' element={<Profile />} />
                  <Route path='/notifs' element={<Notifications />} />
                  <Route path='/messages' element={<Messages />} />
                  <Route path='/followers' element={<Subscribes />} />
                  <Route path='/settings' element={<Setting />} />
                  <Route path='/search' element={<Search />} />
                </Routes>
              </SocketContext.Provider>
            </div>
          </div>
          <div className=''>
            <Routes>
              <Route
                path='/'
                element={
                  window.innerWidth >= 1024 && (
                    <FilterModal category={nav.category} sort={nav.sort} dispatch={dispatch} />
                  )
                }
              />
            </Routes>
          </div>
        </>
      )}
    </div>
  )
}
export default Home
