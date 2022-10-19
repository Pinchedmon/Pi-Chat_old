import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getUserData } from '../../../../api/auth'
import { useDispatch, useSelector } from 'react-redux'
import { setAddMessageStyle, setEditProfileStyle } from '../../../../state/navReducer'
import AddMessage from './components/AddMessage'
import Options from './components/Options'
import EditProfile from './components/EditProfile'
import { UserContext } from '../../../../App'
import { UserAddIcon } from '@heroicons/react/outline'
import { useQuery } from 'react-query'
import { unFollow } from './utils/unfollow'
import { follow } from './utils/follow'
// import ProfilePosts from './components/ProfilePosts'
import InfiniteScroll from 'react-infinite-scroll-component'
import Post from '../../../../components/ui/Post'
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
          {/* icon */}
          <div className='w-full flex mt-16px self-center border-b-2 border-gray-300 pb-16px'>
            <img className=' rounded-xl w-100px h-100px ml-16px mr-16px' src={data[0].pathImg} alt='загружается...' />
            <div className='flex w-full flex-col'>
              {/* naming */}
              <div className='flex items-center align-center w-full  -mt-6px'>
                <div className='font-bold text-2xl'>{data[0].username}</div>
                <p className='ml-8px font-bold text-md text-gray-500'>@{data[0].name}</p>
              </div>
              {/* info */}
              <div>
                {data[0].info}
                {data[0].name !== user.name && (
                  <button
                    className='border-2  p-6px flex mb-6px items-center font-bold'
                    onClick={() =>
                      data.followed === true
                        ? unFollow(user.name, data[0].name, refetch)
                        : follow(user.name, data[0].name, refetch)
                    }
                  >
                    <UserAddIcon className='w-24px mr-8px  ' />
                    {data.followed === true ? (
                      <p className='ml-2px text-md '>Отписаться</p>
                    ) : (
                      <p className='ml-2px text-md'>Подписаться</p>
                    )}
                  </button>
                )}
              </div>
            </div>
            <Options id={0} userName={user.name} profileName={data[0].name} />
          </div>
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
          {/* <ProfilePosts page={page} posts={posts} refetch={refetch} /> */}

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
