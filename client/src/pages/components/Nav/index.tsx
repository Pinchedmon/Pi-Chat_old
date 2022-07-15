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
      <div className='fixed w-full rounded-lg p-2 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6'>
          <div className='flex justify-between items-center border-b-2 border-gray-100 py-4 '>
            <Link
              to='/'
              className='rounded-md p-2 text-lg md:text-2xl hover:bg-gray-100 text-green-600  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-600'
            >
              / π - Чат /
            </Link>
            <div className=' flex items-center justify-end flex-1'>
              <Link
                to='/profile'
                className='text-md md:text-xl rounded-md p-2 mr-2 inline-flex items-center justify-center text-green-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-600 '
              >
                Профиль
              </Link>
            </div>
            <div>
              <button
                onClick={() => setFilterModal(!filterModal)}
                className='rounded-md p-2 inline-flex items-center justify-center text-green-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500'
              >
                <MenuIcon className='h-4 w-4 md:h-6 md:w-6' />
              </button>
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
