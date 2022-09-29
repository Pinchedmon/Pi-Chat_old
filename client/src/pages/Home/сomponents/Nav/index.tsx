import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { MenuAlt1Icon, BellIcon, ChatIcon, UserIcon, CogIcon, LogoutIcon, UserGroupIcon } from '@heroicons/react/solid'
import { useDispatch } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import useAuth from '../../../../hooks/useAuth'
import { setAddPostStyle, setMessageStyle } from '../../../../state/navReducer'
import { UserContext } from '../../../../App'

interface IState {
  nav: {
    sort: string | number
    category: string
    addPostStyle: boolean
  }
}
const Nav = (props: { sort: string | number; category: string }) => {
  const { logout } = useAuth()
  const user = useContext(UserContext)
  const dispatch = useDispatch()
  const style = useSelector((state: IState) => state.nav.addPostStyle)
  const handlePopup = () => {
    dispatch(setAddPostStyle(!style))
  }
  return (
    <div className=' h-full flex justify-center'>
      {user !== undefined && (
        <div className='fixed h-screen'>
          <div className='flex flex-col items-center text-2xl font-bold'>
            <Link to='/' className=' mt-54px rounded-xl mb-54px  text-green-600 font-bold text-4xl'>
              / π - Чат /
            </Link>
            <NavLink to={user.name} className={({ isActive }) => (isActive ? 'activeNavMenu' : 'navMenu')}>
              <UserIcon className='w-32px h-32px' />
              <p className='ml-16px'>Профиль</p>
            </NavLink>
            <NavLink to='' className={({ isActive }) => (isActive ? 'activeNavMenu' : 'navMenu')}>
              <MenuAlt1Icon className='w-32px h-32px' />
              <p className='ml-16px'>Посты</p>
            </NavLink>

            <NavLink
              onClick={() => dispatch(setMessageStyle(false))}
              to='messages'
              className={({ isActive }) => (isActive ? 'activeNavMenu' : 'navMenu')}
            >
              <ChatIcon className='w-32px h-32px' />
              <p className='ml-16px'> Сообщения</p>
            </NavLink>
            <NavLink to='followers' className={({ isActive }) => (isActive ? 'activeNavMenu' : 'navMenu')}>
              <UserGroupIcon className='w-32px h-32px' />
              <p className='ml-16px text-md'>Подписки</p>
            </NavLink>
            <NavLink to='notifs' className={({ isActive }) => (isActive ? 'activeNavMenu' : 'navMenu')}>
              <BellIcon className='w-32px h-32px' />
              <p className='ml-16px'>Уведомления</p>
            </NavLink>

            <NavLink to='settings' className={({ isActive }) => (isActive ? 'activeNavMenu' : 'navMenu')}>
              <CogIcon className='w-32px h-32px' />
              <p className='ml-16px'>Настройки</p>
            </NavLink>
          </div>
          <div
            onClick={handlePopup}
            className='bg-green-600 text-white rounded-3xl  text-center pt-12px pb-12px w-260px text-xl font-bold'
          >
            <button>За / π / ши</button>
          </div>
          <div className='flex justify-center'>
            <div className='absolute bottom-32px flex items-center'>
              <div className='mr-16px'>
                <img className='rounded-2xl w-54px h-54px ' src={user.pathImg} alt='' />
              </div>
              <div className='flex-col mr-32px '>
                <div className='text-xl font-bold'>{user.username}</div>
                <div>@{user.name}</div>
              </div>
              <div onClick={logout} className='w-32px h-32px text-green-600 cursor-pointer'>
                <LogoutIcon />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Nav
