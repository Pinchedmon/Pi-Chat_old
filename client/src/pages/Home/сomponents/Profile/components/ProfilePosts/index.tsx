import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { getMyPosts } from '../../../../../../api/get'
import { Ipost } from '../../../PostPage/types/post.interface'
import Post from '../../../Posts/components/Post'

const ProfilePosts = (props: { setFilter: (status: any) => void; filter: boolean; pathname: string; name: string }) => {
  const [posts, setPosts] = useState<Array<Ipost>>([])
  const [nextPage, setNextPage] = useState(1)
  const defaultCount = 20
  const fetchData = async (token: number, count: number) => {
    token !== undefined &&
      (await getMyPosts(props.pathname.substring(1), nextPage, defaultCount).then((res) => {
        if (props.filter) {
          props.setFilter(false)
          setPosts([...res.data])
          setNextPage(res.page)
          return res
        } else {
          setPosts([...posts, ...res.data])
          setNextPage(res.page)
          return res
        }
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
    setPosts([])
    fetchData(1, defaultCount)
  }, [props.pathname, props.filter])
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
