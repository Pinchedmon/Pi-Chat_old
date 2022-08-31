import React from 'react'
import { getPosts } from '../../../api/get'
import Post from '../../../components/Post'

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
    <>
      <div className='p-32px text-xl border-b-2 border-gray-300'>Сделать пост</div>
      <div className='flex flex-col mt-16px '>
        <Post getPost={getPosts} getObject={{ sort, category }} naming='posts' />
      </div>
    </>
  )
}
export default Posts
