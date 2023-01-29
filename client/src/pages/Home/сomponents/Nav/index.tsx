import React, { useContext, useState } from 'react'
import { MenuAlt1Icon, BellIcon, ChatIcon, UserIcon, CogIcon, UserGroupIcon, XIcon } from '@heroicons/react/solid'
import { Link, NavLink } from 'react-router-dom'
import { setIsNavExpanded } from '../../../../state/navReducer'
import { UserContext } from '../../../../App'
import PersonData from './сomponents/PersonData'
import Modal from '../../../../components/ux/Modal'
import AddPost from './сomponents/AddPost'
import { useDispatch } from 'react-redux'

const Nav = () => {
  const user = useContext(UserContext)
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()
  return (
    <div className='wrapper__nav'>
      <div className='nav-area '>
        {window.innerWidth < 1024 && (
          <div className='absolute right-0px' onClick={() => dispatch(setIsNavExpanded(false))}>
            <XIcon className='w-24px text-[#20A740]' />
          </div>
        )}

        <div className='nav'>
          <Link to='/' className='nav-logo'>
            / π - Чат /
          </Link>

          <NavLink
            to={user.name}
            onClick={() => dispatch(setIsNavExpanded(false))}
            className={({ isActive }) => (isActive ? 'nav-menu__active' : 'nav-menu')}
          >
            <UserIcon className='nav-icon' />
            <p>Профиль</p>
          </NavLink>
          <NavLink
            to=''
            onClick={() => dispatch(setIsNavExpanded(false))}
            className={({ isActive }) => (isActive ? 'nav-menu__active' : 'nav-menu')}
          >
            <MenuAlt1Icon className='nav-icon' />
            <p>Посты</p>
          </NavLink>
          <NavLink
            to='messages'
            onClick={() => dispatch(setIsNavExpanded(false))}
            className={({ isActive }) => (isActive ? 'nav-menu__active' : 'nav-menu')}
          >
            <div className='relative inline-block'>
              <ChatIcon className='nav-icon' />
              <span className='absolute -top-12px pl-2px pr-2px text-white bg-red-500 rounded-xl text-center right-12px text-lg'>
                {(user.msgNotys !== 0) === true ? (user.msgNotys < 1000 === true ? user.msgNotys : '999+') : ''}
              </span>
            </div>
            <p>Сообщения</p>
          </NavLink>
          <NavLink
            to='followers'
            onClick={() => dispatch(setIsNavExpanded(false))}
            className={({ isActive }) => (isActive ? 'nav-menu__active' : 'nav-menu')}
          >
            <UserGroupIcon className='nav-icon' />
            <p>Подписки</p>
          </NavLink>
          <NavLink
            to='notifs'
            onClick={() => dispatch(setIsNavExpanded(false))}
            className={({ isActive }) => (isActive ? 'nav-menu__active' : 'nav-menu')}
          >
            <div className='relative inline-block'>
              <BellIcon className='nav-icon' />
              <span className='absolute -top-12px pl-2px pr-2px text-white bg-red-500 rounded-xl text-center right-12px text-lg'>
                {(user.notys !== 0) === true ? (user.notys < 1000 === true ? user.notys : '999+') : ''}
              </span>
            </div>
            <p>Уведомления</p>
          </NavLink>
          <NavLink
            to='settings'
            onClick={() => dispatch(setIsNavExpanded(false))}
            className={({ isActive }) => (isActive ? 'nav-menu__active' : 'nav-menu')}
          >
            <CogIcon className='nav-icon' />
            <p>Настройки</p>
          </NavLink>
          <div
            onClick={() => {
              setIsOpen(true)
            }}
            className='nav-send__button'
          >
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
