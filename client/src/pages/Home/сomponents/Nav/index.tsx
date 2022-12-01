import React, { useContext, useState } from 'react'
import { MenuAlt1Icon, BellIcon, ChatIcon, UserIcon, CogIcon, UserGroupIcon, XIcon } from '@heroicons/react/solid'
import { Link, NavLink } from 'react-router-dom'
import { setIsNavExpanded, setMessageStyle } from '../../../../state/navReducer'
import { UserContext } from '../../../../App'
import PersonData from './сomponents/PersonData'
import Modal from '../../../../components/ux/Modal'
import AddPost from './сomponents/AddPost'
import { useDispatch } from 'react-redux'

const Nav = () => {
  const user = useContext(UserContext)
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()
  // const [isNavExpanded, setIsNavExpanded] = useState(false)
  //window.innerWidth
  return (
    <div className='wrapper__nav'>
      <div className='nav-area relative'>
        {window.innerWidth < 1024 && (
          <div className='absolute right-0px' onClick={() => dispatch(setIsNavExpanded(false))}>
            <XIcon className='w-24px text-[#20A740]' />
          </div>
        )}

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
          <div onClick={() => setIsOpen(true)} className='nav-send__button'>
            <button>За / π / ши</button>
          </div>
          <PersonData name={user.name} username={user.username} pathImg={user.pathImg} />
        </div>
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          <AddPost setIsOpen={setIsOpen} />
        </Modal>
      </div>
    </div>
  )
}

export default Nav
