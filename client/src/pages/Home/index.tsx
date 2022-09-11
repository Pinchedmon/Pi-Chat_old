import Nav from './сomponents/Nav'
import React, { useState, useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../../api/get'
import { useQuery } from 'react-query'
import FilterModal from './сomponents/Nav/сomponents/FilterModal'
import { Route, Routes } from 'react-router-dom'
import Post from './сomponents/Posts/components/Post'
import AddPost from './сomponents/Nav/сomponents/AddPost'
import { setAddPostStyle } from '../../state/navReducer'
import UserProfile from './сomponents/UserProfile'
import Posts from './сomponents/Posts'
import Profile from './сomponents/Profile'
import Messages from './сomponents/Dialogs'
import { UserContext } from '../../App'
interface iState {
  nav: {
    sort: string | number
    category: string
    addPostStyle: boolean
  }
}
const Home = () => {
  const user = useContext(UserContext)
  const sort = useSelector((state: iState) => state.nav.sort)
  const category = useSelector((state: iState) => state.nav.category)
  const { data, refetch } = useQuery('posts', () => getPosts({ sort, category }))
  const [posts, setPosts] = useState()
  const dispatch = useDispatch()
  useEffect(() => {
    setPosts(data)
  }, [data])
  useEffect(() => {
    refetch()
  }, [category, refetch, sort])
  const style = useSelector((state: iState) => state.nav.addPostStyle)
  return (
    <div className='grid grid-cols-4 gap-0px'>
      {user !== undefined && (
        <>
          <div className='h-screen'>
            <Nav sort={sort} category={category} />
          </div>
          <div className='relative col-span-2 border-l-2 border-r-2 max-w-full border-gray-300'>
            <Routes>
              <Route path='/' element={posts !== undefined && <Posts sort={sort} category={category} data={posts} />} />
              <Route path='/post' element={<Post />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/*' element={<UserProfile />} />
              <Route path='/messages' element={<Messages />} />
            </Routes>
            {style === true && <AddPost handlePopup={() => dispatch(setAddPostStyle(!style))} />}
          </div>
          <div className=''>
            <Routes>
              <Route path='/' element={<FilterModal category={category} sort={sort} dispatch={dispatch} />} />
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
