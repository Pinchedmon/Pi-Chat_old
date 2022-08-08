import Posts from './components/Posts/Posts'
import Nav from './components/Nav'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../api/getPosts'
import { useQuery } from 'react-query'
import FilterModal from './components/Nav/FilterModal'
import { Route, Routes } from 'react-router-dom'
import Post from './components/Posts/Post/Post'
import Profile from './components/Profile/FilesUploadComponent/Profile'
import AddPost from './components/AddPost'
import { setAddPostStyle } from '../state/navReducer'
interface iState {
  nav: {
    sort: string | number
    category: string
    addPostStyle: boolean
  }
}
const Feed = () => {
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
      <div className='h-screen  '>
        <Nav sort={sort} category={category} />
      </div>
      <div className='col-span-2 border-l-2 border-r-2 border-gray-300'>
        <Routes>
          <Route path='/' element={posts !== undefined && <Posts sort={sort} category={category} data={posts} />} />
          <Route path='/post' element={<Post />} />
          <Route path='/profile' element={<Profile />} />
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
    </div>
  )
}
export default Feed
