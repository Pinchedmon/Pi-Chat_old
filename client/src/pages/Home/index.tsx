import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import Nav from './сomponents/Nav'
import FilterModal from './сomponents/Nav/сomponents/FilterModal'
import Post from './сomponents/PostPage'
import AddPost from './сomponents/Nav/сomponents/AddPost'
import { setAddPostStyle } from '../../state/navReducer'
import Profile from './сomponents/Profile'
import Posts from './сomponents/Posts'
import Messages from './сomponents/Dialogs'
import { UserContext } from '../../App'
import Followers from './сomponents/Subscribes'
interface iState {
  nav: {
    sort: string | number
    category: string
    addPostStyle: boolean
  }
}
const Home = () => {
  const user = useContext(UserContext)
  const nav = useSelector((state: iState) => state.nav)
  const dispatch = useDispatch()
  return (
    <div className='grid grid-cols-4 gap-0px'>
      {user !== undefined && (
        <>
          <div className='h-screen'>
            <Nav />
          </div>
          <div className='relative col-span-2 border-l-2 border-r-2 max-w-full border-gray-300'>
            <Routes>
              <Route path='/' element={<Posts sort={nav.sort} category={nav.category} />} />
              <Route path='/post' element={<Post />} />
              {/* <Route path='/profile' element={<Profile />} /> */}
              <Route path='/*' element={<Profile />} />
              <Route path='/messages' element={<Messages />} />
              <Route path='/followers' element={<Followers />} />
            </Routes>
            {nav.addPostStyle === true && <AddPost handlePopup={() => dispatch(setAddPostStyle(!nav.addPostStyle))} />}
          </div>
          <div className=''>
            <Routes>
              <Route path='/' element={<FilterModal category={nav.category} sort={nav.sort} dispatch={dispatch} />} />
              {/* <Route path='/post' element={<Post />} />
          <Route path='/profile' element={<Profile />} /> */}
            </Routes>
          </div>
        </>
      )}
    </div>
  )
}
export default Home
