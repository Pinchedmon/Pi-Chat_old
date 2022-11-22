import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { getPosts } from '../../../../api/get'
import AddPost from './components/AddPost'
import Post from './components/Post'
import { Iparams, Ipost } from './types/posts.interface'

const Posts = (props: Iparams) => {
  const [posts, setPosts] = useState<Array<Ipost>>([])
  const { sort, category } = props
  const [filter, setFilter] = useState(false)
  const defaultCount = 10
  const [nextPage, setNextPage] = useState(1)
  const fetchData = async (token: number, count: number) => {
    token !== undefined &&
      (await getPosts({ sort, category, page: token, count: count }).then((res) => {
        if (filter) {
          setFilter(false)
          setPosts([...res.data])
          setNextPage(res.page)
          return res
        }
        setPosts([...posts, ...res.data])
        setNextPage(res.page)
        return res
      }))
  }
  const handleFetchMore = () => {
    fetchData(nextPage, defaultCount)
  }
  const deletePost = (id: number) => {
    setPosts([...posts.filter((msg: Ipost) => msg.ID !== id)])
  }
  const addPost = (post: Ipost) => {
    setPosts([post, ...posts])
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
    setFilter(true)
    fetchData(1, defaultCount)
  }, [sort, category])

  return (
    <div className='flex flex-col'>
      <>
        <AddPost refetch={addPost} />
        <div className='grow'>
          <InfiniteScroll
            next={() => {
              handleFetchMore()
            }}
            hasMore={true}
            loader={'424232'}
            dataLength={posts.length}
          >
            <Post data={posts} deletePost={deletePost} likePost={likePost} />
          </InfiniteScroll>
        </div>
      </>
    </div>
  )
}
export default Posts
