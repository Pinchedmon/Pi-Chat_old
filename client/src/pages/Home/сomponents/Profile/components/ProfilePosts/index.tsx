import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { getMyPosts } from '../../../../../../api/get'
import { Ipost } from '../../../PostPage/types/post.interface'
import Post from '../../../Posts/components/Post'

const ProfilePosts = (props: { pathname: string; name: string }) => {
  const [posts, setPosts] = useState<Array<Ipost>>([])
  const [nextPage, setNextPage] = useState(1)
  const defaultCount = 20
  const fetchData = async (token: number, count: number) => {
    token !== undefined &&
      (await getMyPosts(props.name, nextPage, Math.round(window.innerHeight / 200)).then((res) => {
        setPosts([...posts, ...res.data])
        setNextPage(res.page)
      }))
  }
  const handleFetchMore = () => {
    fetchData(nextPage, defaultCount)
  }
  const deletePost = (id: number) => {
    setPosts([...posts.filter((msg: Ipost) => msg.ID !== id)])
  }
  const likePost = (id: number, likes: number) => {
    setPosts([
      ...posts,
      ...posts.filter((msg: Ipost) => {
        if (msg.ID === id) {
          msg.likes = likes
        }
      }),
    ])
  }
  useEffect(() => {
    fetchData(nextPage, defaultCount)
  }, [])
  return (
    <>
      <InfiniteScroll
        next={() => {
          handleFetchMore()
        }}
        hasMore={true}
        loader={'loading'}
        dataLength={posts.length}
      >
        <Post data={posts} deletePost={deletePost} likePost={likePost} />
      </InfiniteScroll>
    </>
  )
}

export default ProfilePosts
