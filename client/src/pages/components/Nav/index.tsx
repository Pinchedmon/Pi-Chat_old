import { setAddPostStyle } from '../../../state/navReducer'
import AddPost from '../AddPost/index'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { MenuIcon } from '@heroicons/react/outline'
import { useDispatch } from 'react-redux'
import FilterModal from './FilterModal'
import { Link, useNavigate } from 'react-router-dom'
const Nav = (props: { sort: string | number; category: string }) => {
  let user: any
  if (localStorage['user']) {
    user = JSON.parse(localStorage.getItem('user') || '')
  }
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { category, sort } = props
  const style = useSelector((state: any) => state.nav.addPostStyle)
  const handlePopup = () => {
    if (!user) {
      navigate('/login')
    } else {
      dispatch(setAddPostStyle(!style))
    }
  }
  const [filterModal, setFilterModal] = useState(false)
  return (
    <>
      <div className='fixed w-full bg-green-600 '>
        <div className='max-w-7xl mx-auto pt-8px pb-8px '>
          <div className='flex justify-between items-center drop-shadow '>
            <Link
              to='/'
              className='ml-8px rounded-xl bg-green-800 text-green-300 p-6px text-lg pl-24px pr-24px font-bold md:text-2xl hover:bg-green-300 hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-600'
            >
              / π - Чат /
            </Link>
            <div className='flex justify-end mr-8px'>
              <div className=' bg-green-800 text-green-300 flex align-center rounded-xl'>
                <Link
                  to='/profile'
                  className='text-md md:text-lg font-bold rounded-xl pr-16px pl-16px pt-8px pb-8px mr-8px  items-center   hover:bg-green-300 hover:text-green-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-600 '
                >
                  Профиль
                </Link>
                <button
                  onClick={() => setFilterModal(!filterModal)}
                  className='flex self-center h-32px w-32px rounded-md mr-8px     hover:bg-green-800  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500'
                >
                  <MenuIcon />
                </button>
              </div>
            </div>
          </div>
          {filterModal && <FilterModal category={category} sort={sort} dispatch={dispatch} handlePopup={handlePopup} />}
        </div>
        {style && <AddPost handlePopup={handlePopup} />}
      </div>
    </>
  )
}

export default Nav
