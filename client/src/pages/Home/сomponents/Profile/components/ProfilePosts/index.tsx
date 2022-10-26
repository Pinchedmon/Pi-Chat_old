import React, { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useQuery } from 'react-query'
import { getMyPosts } from '../../../../../../api/get'
import { Ipost } from '../../../PostPage/types/post.interface'
import Post from '../../../Posts/components/Post'

const ProfilePosts = (props: { name: string }) => {
  let page = 1
  const [posts, setPosts] = useState<Array<Ipost>>([])
  const { refetch } = useQuery('myPosts', () => {
    getMyPosts(props.name).then((res) => {
      if (res.status === 200) {
        if (page < 2) {
          setPosts(res.data)
        } else {
          setPosts([...posts, ...res.data])
        }
      }
    })
  })
  return (
    <div className='mt-16px'>
      <InfiniteScroll
        next={() => {
          page++
          refetch()
        }}
        hasMore={true}
        loader={'loading'}
        dataLength={posts.length}
      >
        <Post data={posts} refetch={refetch} />
      </InfiniteScroll>
    </div>
  )
}

export default ProfilePosts
