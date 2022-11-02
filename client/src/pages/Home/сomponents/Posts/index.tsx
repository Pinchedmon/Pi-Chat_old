import React, { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useQuery } from 'react-query'
import { getPosts } from '../../../../api/get'
import AddPost from './components/AddPost'
import Post from './components/Post'
import { Iparams, Ipost } from './types/posts.interface'

const Posts = (props: Iparams) => {
  const [posts, setPosts] = useState<Array<Ipost>>()
  const { sort, category } = props
  let page = 1
  const { refetch } = useQuery('myPosts', () =>
    getPosts({ sort, category, page }).then((res) => {
      if (res.status === 200) {
        if (page < 2) {
          setPosts(res.data)
        } else {
          setPosts([...posts, ...res.data])
        }
      }
    }),
  )
  return (
    <div>
      {posts && (
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
