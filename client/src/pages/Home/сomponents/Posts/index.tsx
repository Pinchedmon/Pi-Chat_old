import React from 'react'
import { useQuery } from 'react-query'
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
  const { data, refetch } = useQuery('myPosts', () =>
    getPosts({ sort, category }).then((res: any) => {
      if (res.status === 200) {
        return res.data
      }
    }),
  )
  return (
    <div>
      <AddPost />
      <div className='flex flex-col mt-16px '>
        <Post data={data} refetch={refetch} />
      </div>
    </div>
  )
}
export default Posts
