import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getUserData } from '../../../../api/auth'
import { useDispatch, useSelector } from 'react-redux'
import { setAddMessageStyle, setEditProfileStyle } from '../../../../state/navReducer'
import AddMessage from './components/AddMessage'
import EditProfile from './components/EditProfile'
import { UserContext } from '../../../../App'
import { useQuery } from 'react-query'
// import ProfilePosts from './components/ProfilePosts'
import InfiniteScroll from 'react-infinite-scroll-component'
import Post from '../../../../components/ui/Post'
import ProfileInfo from './components/ProfileInfo'
interface IState {
  nav: {
    addMessageStyle: boolean
    editProfileStyle: boolean
  }
}
function Profile() {
  let location = useLocation()
  let page = 1
  const user = useContext(UserContext)
  const dispatch = useDispatch()
  const addMessageStatus = useSelector((state: IState) => state.nav.addMessageStyle)
  const editProfileStatus = useSelector((state: IState) => state.nav.editProfileStyle)
  const [posts, setPosts] = useState<Array<any>>([{}])
  const { data, refetch } = useQuery('userData', () =>
    getUserData(location.pathname.slice(1).toString(), user.name, page).then((res: any) => {
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
          {/* profile */}
          {/* background photo */}
          <img className=' h-200px w-full border-b-2 border-gray-300' src={data[0].backImg} alt='загружается...' />
          {/* profile info */}
          <ProfileInfo profile={data[0]} refetch={refetch} name={user.name} followed={data.followed} />
          {/* posts */}
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
          {addMessageStatus === true && (
            <AddMessage name={data[0].name} showMessage={() => dispatch(setAddMessageStyle(!addMessageStatus))} />
          )}
          {editProfileStatus === true && (
            <EditProfile
              refetch={refetch}
              name={data[0].name}
              showMessage={() => dispatch(setEditProfileStyle(!editProfileStatus))}
            />
          )}
        </div>
      )}
    </>
  )
}

export default Profile
