import React, { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useQuery } from 'react-query'
import { getPosts } from '../../../../api/get'
import Post from '../../../../components/ui/Post'
import AddPost from './components/AddPost'

type iPost = {
  userImg: string
  author: string
  text: string
  postImg: string
  likes: number | string
  ID: number
  comments: number | string
}
interface IParams {
  sort: string | number
  category: string
}
interface iResolve {
  status: number
  data: Array<iPost>
}
const Posts = (props: IParams) => {
  const [posts, setPosts] = useState<Array<iPost>>()
  const { sort, category } = props
  let page = 1
  const { refetch } = useQuery('myPosts', () =>
    getPosts({ sort, category, page }).then((res: iResolve) => {
      if (page < 2) {
        if (res.status === 200) {
          setPosts(res.data)
        }
      } else {
        if (res.status === 200) {
          let x = false
          for (var i = 0; i < posts.length; i++) {
            if (posts[i] === res.data[i]) {
              x = true
            }
          }
          if (x === true) {
            setPosts([...posts, ...res.data])
          }
        }
      }
    }),
  )
  return (
    <div>
      {posts !== undefined && (
        <>
          <AddPost />
          <div className='flex flex-col mt-16px '>
            <InfiniteScroll
              next={() => {
                page++
                refetch()
              }}
              hasMore={true}
              loader={'424232'}
              dataLength={posts.length}
            >
              <Post data={posts} refetch={refetch} />
            </InfiniteScroll>
          </div>
        </>
      )}
    </div>
  )
}
export default Posts
