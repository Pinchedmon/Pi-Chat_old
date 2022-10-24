import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getUserData } from '../../../../api/auth'
import { useDispatch, useSelector } from 'react-redux'
import { setAddMessageStyle } from '../../../../state/navReducer'
import AddMessage from './components/AddMessage'
import EditProfile from './components/EditProfile'
import { UserContext } from '../../../../App'
import { useQuery } from 'react-query'
// import ProfilePosts from './components/ProfilePosts'
import InfiniteScroll from 'react-infinite-scroll-component'
import ProfileInfo from './components/ProfileInfo'
import Post from '../Posts/components/Post'
import { Istore } from '../../../../types/store.interface'
import { Ipost } from '../PostPage/types/post.interface'

function Profile() {
  let page = 1
  let location = useLocation()
  const user = useContext(UserContext)
  const dispatch = useDispatch()
  const nav = useSelector((state: Istore) => state.nav)
  const [posts, setPosts] = useState<Array<Ipost>>()
  const { data, refetch } = useQuery('userData', () =>
    getUserData({ name: location.pathname.slice(1).toString(), username: user.name, page: page }).then((res: any) => {
      if (res.status === 200) {
        if (page < 2) {
          setPosts(res.data.posts)
        } else {
          setPosts([...posts, ...res.data.posts])
        }
        return res.data
      }
    }),
  )
  return (
    <>
      {data !== undefined && (
        <div>
          <img className=' h-200px w-full border-b-2 border-gray-300' src={data[0].backImg} alt='загружается...' />
          <ProfileInfo profile={data[0]} refetch={refetch} name={user.name} followed={data.followed} />
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
          {nav.addMessageStyle === true && (
            <AddMessage name={data[0].name} showMessage={() => dispatch(setAddMessageStyle(!nav.addMessageStyle))} />
          )}
          {nav.editProfileStyle === true && <EditProfile refetch={refetch} />}
        </div>
      )}
    </>
  )
}

export default Profile
