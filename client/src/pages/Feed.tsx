import Posts from './Posts'
import Nav from './components/Nav'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getPosts } from '../api/getPosts'
import { useQuery } from 'react-query'
const Feed = () => {
  const sort = useSelector((state: any) => state.nav.sort)
  const category = useSelector((state: any) => state.nav.category)
  const { data, refetch } = useQuery('posts', () => getPosts({ sort, category }))
  const [posts, setPosts] = useState([{}])
  useEffect(() => {
    setPosts(data)
  }, [data])
  useEffect(() => {
    refetch()
  }, [category, refetch, sort])
  return (
    <>
      <Nav sort={sort} category={category} />{' '}
      {posts !== undefined && <Posts sort={sort} category={category} data={posts} />}
    </>
  )
}
export default Feed
