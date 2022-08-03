import { setAddPostStyle } from '../../../state/navReducer'
import AddPost from '../AddPost/index'
import React from 'react'
import { useSelector } from 'react-redux'
import { MenuAlt1Icon, BellIcon, ChatIcon, UserIcon, CogIcon, LogoutIcon } from '@heroicons/react/solid'
import { useDispatch } from 'react-redux'
import FilterModal from './FilterModal'
import { Link } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
const Nav = (props: { sort: string | number; category: string }) => {
  const { user, logout } = useAuth()
  const dispatch = useDispatch()

  const style = useSelector((state: any) => state.nav.addPostStyle)
  const handlePopup = () => {
    dispatch(setAddPostStyle(!style))
  }
  return (
    <div className=' h-full flex justify-center'>
      <div className='fixed h-screen'>
        <div className='flex flex-col items-center text-2xl font-bold'>
          <Link to='/' className=' mt-54px rounded-xl mb-54px  text-green-600 font-bold text-4xl'>
            / π - Чат /
          </Link>
          <Link className='w-200px flex mb-32px text-green-600' to=''>
            <MenuAlt1Icon className='w-32px h-32px' />
            <p className='ml-16px'>Посты</p>
          </Link>
          <Link className='w-200px flex mb-32px' to=''>
            <BellIcon className='w-32px h-32px' />
            <p className='ml-16px'> Уведомления</p>
          </Link>
          <Link className='w-200px flex mb-32px' to=''>
            <ChatIcon className='w-32px h-32px' />
            <p className='ml-16px'> Сообщения</p>
          </Link>
          <Link className='w-200px flex mb-32px' to='/profile'>
            <UserIcon className='w-32px h-32px' />
            <p className='ml-16px'>Профиль</p>
          </Link>
          <Link className='w-200px flex mb-54px' to=''>
            <CogIcon className='w-32px h-32px' />
            <p className='ml-16px'>Настройки</p>
          </Link>
        </div>
        <div className='bg-green-600 text-white rounded-3xl  text-center pt-12px pb-12px w-260px text-xl font-bold'>
          <button>Постить</button>
        </div>
        <div className='flex justify-center'>
          <div className='absolute bottom-32px flex items-center'>
            <div className='mr-16px'>
              <img className='rounded-2xl w-54px h-54px ' src={user.user.img} alt='' />
            </div>
            <div className='flex-col mr-32px '>
              <div className='text-xl font-bold'>{user.user.name}</div>
              <div>@псевдоимя</div>
            </div>
            <div onClick={logout} className='w-32px h-32px text-green-600 cursor-pointer'>
              <LogoutIcon />
            </div>
          </div>
        </div>
      </div>
      {/* <AddPost handlePopup={handlePopup} /> */}
    </div>
  )
}

export default Nav
