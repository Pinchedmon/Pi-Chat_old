import Posts from './components/Posts/Posts'
import Nav from './components/Nav'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../api/getPosts'
import { useQuery } from 'react-query'
import FilterModal from './components/Nav/FilterModal'
const Feed = () => {
  const sort = useSelector((state: any) => state.nav.sort)
  const category = useSelector((state: any) => state.nav.category)
  const { data, refetch } = useQuery('posts', () => getPosts({ sort, category }))
  const [posts, setPosts] = useState([{}])
  const dispatch = useDispatch()
  useEffect(() => {
    setPosts(data)
  }, [data])
  useEffect(() => {
    refetch()
  }, [category, refetch, sort])
  return (
    <div className='grid grid-cols-4 gap-0px'>
      <div className='border-r-2 border-gray-100 '>
        <Nav sort={sort} category={category} />
      </div>
      <div className='col-span-2 '>
        <div className='p-32px text-xl border-b-2 border-gray-100'>Сделать пост</div>
        {posts !== undefined && <Posts sort={sort} category={category} data={posts} />}
      </div>
      <div className='border-l-2 border-gray-100'>
        <FilterModal category={category} sort={sort} dispatch={dispatch} />
      </div>
    </div>
  )
}
export default Feed
