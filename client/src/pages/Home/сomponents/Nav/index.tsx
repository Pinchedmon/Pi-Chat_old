import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { MenuAlt1Icon, BellIcon, ChatIcon, UserIcon, CogIcon, UserGroupIcon } from '@heroicons/react/solid'
import { useDispatch } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { setAddPostStyle, setMessageStyle } from '../../../../state/navReducer'
import { UserContext } from '../../../../App'
import { Istore } from '../../../../types/store.interface'
import PersonData from './сomponents/PersonData'

const Nav = () => {
  const user = useContext(UserContext)
  const dispatch = useDispatch()
  const style = useSelector((state: Istore) => state.nav.addPostStyle)
  const handlePopup = () => {
    dispatch(setAddPostStyle(!style))
  }
  return (
    <div className='wrapper__nav'>
      <div className='nav-area'>
        <div className='nav'>
          <Link to='/' className='nav-logo'>
            / π - Чат /
          </Link>
          <NavLink to={user.name} className={({ isActive }) => (isActive ? 'nav-menu__active' : 'nav-menu')}>
            <UserIcon className='nav-icon' />
            <p>Профиль</p>
          </NavLink>
          <NavLink to='' className={({ isActive }) => (isActive ? 'nav-menu__active' : 'nav-menu')}>
            <MenuAlt1Icon className='nav-icon' />
            <p>Посты</p>
          </NavLink>
          <NavLink
            onClick={() => dispatch(setMessageStyle(false))}
            to='messages'
            className={({ isActive }) => (isActive ? 'nav-menu__active' : 'nav-menu')}
          >
            <ChatIcon className='nav-icon' />
            <p>Сообщения</p>
          </NavLink>
          <NavLink to='followers' className={({ isActive }) => (isActive ? 'nav-menu__active' : 'nav-menu')}>
            <UserGroupIcon className='nav-icon' />
            <p>Подписки</p>
          </NavLink>
          <NavLink to='notifs' className={({ isActive }) => (isActive ? 'nav-menu__active' : 'nav-menu')}>
            <BellIcon className='nav-icon' />
            <p>Уведомления</p>
          </NavLink>
          <NavLink to='settings' className={({ isActive }) => (isActive ? 'nav-menu__active' : 'nav-menu')}>
            <CogIcon className='nav-icon' />
            <p>Настройки</p>
          </NavLink>
        </div>
        <div onClick={handlePopup} className='nav-send__button'>
          <button>За / π / ши</button>
        </div>
        <PersonData name={user.name} username={user.username} pathImg={user.pathImg} />
      </div>
    </div>
  )
}

export default Nav
