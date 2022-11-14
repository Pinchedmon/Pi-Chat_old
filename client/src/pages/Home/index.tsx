import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
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

const Home = () => {
  const user = useContext(UserContext)
  const [colorTheme, setTheme]: any = useDarkMode()
  const nav = useSelector((state: Istore) => state.nav)
  const dispatch = useDispatch()
  return (
    <div className='home'>
      {user && (
        <>
          <Nav />
          <div className='content-area'>
            <Routes>
              <Route path='/' element={<Posts sort={nav.sort} category={nav.category} />} />
              <Route path='/post' element={<Post />} />
              <Route path='/*' element={<Profile />} />
              <Route path='/messages' element={<Messages />} />
              <Route path='/followers' element={<Subscribes />} />
              <Route path='/settings' element={<Setting />} />
            </Routes>
          </div>
          <div className=''>
            <Routes>
              <Route path='/' element={<FilterModal category={nav.category} sort={nav.sort} dispatch={dispatch} />} />
            </Routes>
          </div>
        </>
      )}
    </div>
  )
}
export default Home
