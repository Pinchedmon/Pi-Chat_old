import React, { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
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
  sort: string | number
  category: string
}

const Posts = (props: IPosts) => {
  const [posts, setPosts] = useState<any>()
  const { sort, category } = props
  let page = 1
  const { refetch } = useQuery('myPosts', () =>
    getPosts({ sort, category, page }).then((res: any) => {
      if (page < 2) {
        if (res.status === 200) {
          setPosts(res.data)
        }
      } else {
        if (res.status === 200) {
          let x = false
          for (var i = 0; i < posts.length; i++) {
            if (posts[i] === res.data[i]) {
              return true
            }
          }
          x && setPosts([...posts, res.data])
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
              dataLength={posts}
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
