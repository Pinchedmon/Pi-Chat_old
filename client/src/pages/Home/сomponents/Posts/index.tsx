import React, { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useQuery } from 'react-query'
import { getPosts } from '../../../../api/get'
import AddPost from './components/AddPost'
import Post from './components/Post'
import { Iparams, Ipost } from './types/posts.interface'

const Posts = (props: Iparams) => {
  const [posts, setPosts] = useState<Array<Ipost>>([])
  const { sort, category } = props
  const [nextPage, setNextPage] = useState(1)
  const { data, refetch } = useQuery('myPosts', () =>
    getPosts({ sort, category, page: nextPage, count: Math.round(window.innerHeight / 200) }).then((res) => {
      setPosts([...posts, ...res.data])
      setNextPage(res.page)

      return res
    }),
  )

  return (
    <div className='flex flex-col'>
      {data ? (
        <>
          <AddPost />
          <div className='grow'>
            <InfiniteScroll
              next={() => {
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
      ) : (
        <></>
      )}
    </div>
  )
}
export default Posts
