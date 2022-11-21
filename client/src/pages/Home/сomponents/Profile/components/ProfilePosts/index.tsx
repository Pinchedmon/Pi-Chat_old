import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useQuery } from 'react-query'
import { getMyPosts } from '../../../../../../api/get'
import { Ipost } from '../../../PostPage/types/post.interface'
import Post from '../../../Posts/components/Post'

const ProfilePosts = (props: { pathname: string; name: string }) => {
  const [posts, setPosts] = useState<Array<Ipost>>([])
  const [nextPage, setNextPage] = useState(1)
  const { refetch } = useQuery('myPosts', () => {
    getMyPosts(props.name, nextPage, Math.round(window.innerHeight / 200)).then((res) => {
      setPosts([...posts, ...res.data])
      setNextPage(res.page)
    })
  })

  return (
    <>
      <InfiniteScroll
        next={() => {
          refetch()
        }}
        hasMore={true}
        loader={'loading'}
        dataLength={posts.length}
      >
        <Post
          data={posts}
          refetch={refetch}
          deletePost={function (x: number): void {
            throw new Error('Function not implemented.')
          }}
          likePost={function (id: number, likes: number): void {
            throw new Error('Function not implemented.')
          }}
        />
      </InfiniteScroll>
    </>
  )
}

export default ProfilePosts
