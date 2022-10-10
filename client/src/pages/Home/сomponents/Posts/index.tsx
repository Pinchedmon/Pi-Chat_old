import React from 'react'
import { getPosts } from '../../../../api/get'
import AddPost from './components/AddPost'
import Post from './components/Post/components/PostData'

type iPost = {
  userImg: string
  author: string
  text: string
  postImg: string
  likes: number | string
  ID: number
  comments: number | string
}

interface IPosts {
  data: Array<iPost>
  sort: string | number
  category: string
}

const Posts = (props: IPosts) => {
  const { sort, category } = props
  return (
    <div>
      <AddPost />
      <div className='flex flex-col mt-16px '>
        <Post getPost={getPosts} getObject={{ sort, category }} naming='posts' />
      </div>
    </div>
  )
}
export default Posts
