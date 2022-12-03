import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useLocation } from 'react-router-dom'
import Nav from './сomponents/Nav'
import FilterModal from './сomponents/Nav/сomponents/FilterModal'
import Post from './сomponents/PostPage'
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

const Home = () => {
  const user = useContext(UserContext)
  const [] = useDarkMode()
  const nav = useSelector((state: Istore) => state.nav)
  const dispatch = useDispatch()
  const location = useLocation()
  useEffect(() => {
    if (window.innerHeight > 1024) {
      dispatch(setIsNavExpanded(true))
    } else {
      dispatch(setIsNavExpanded(false))
    }
  }, [window.innerWidth])
  return (
    <div className='home'>
      {user && (
        <>
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
              <Routes>
                <Route path='/' element={<Posts sort={nav.sort} category={nav.category} />} />
                <Route path='/post' element={<Post />} />
                <Route path='/*' element={<Profile />} />
                <Route path='/notifs' element={<Notifications />} />
                <Route path='/messages' element={<Messages />} />
                <Route path='/followers' element={<Subscribes />} />
                <Route path='/settings' element={<Setting />} />
              </Routes>
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
