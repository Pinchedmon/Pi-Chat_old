import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { getUserData } from '../../../../api/auth'
import { useDispatch, useSelector } from 'react-redux'
import { setAddMessageStyle, setEditProfileStyle } from '../../../../state/navReducer'
import AddMessage from './components/AddMessage'
import Options from './components/Options'
import EditProfile from './components/EditProfile'
import { UserContext } from '../../../../App'
import { UserAddIcon } from '@heroicons/react/outline'
import redaxios from 'redaxios'
import { useQuery } from 'react-query'
import PostData from './components/PostData'
interface IUser {
  followed: boolean
  posts: Array<any>
  0: { backImg: string; pathImg: string; name: string; username: string; info: string }
}
interface IState {
  nav: {
    addMessageStyle: boolean
    editProfileStyle: boolean
  }
}
function Profile() {
  let location = useLocation()
  const user = useContext(UserContext)
  const dispatch = useDispatch()
  const addMessageStatus = useSelector((state: IState) => state.nav.addMessageStyle)
  const editProfileStatus = useSelector((state: IState) => state.nav.editProfileStyle)

  const handleFollow = (name: string, object: string) => {
    redaxios.post(`http://localhost:6060/follow/follow?name=${name}&object=${object}`).then((res: any) => {
      if (res.status === 200) {
        refetch()
      }
    })
  }
  const unFollow = async (name: string, object: string) => {
    redaxios.delete(`http://localhost:6060/follow/unfollow?name=${name}&object=${object}`).then((res: any) => {
      if (res.status === 200) {
        refetch()
      }
    })
  }
  const { data, refetch } = useQuery('userData', () =>
    getUserData(location.pathname.slice(1).toString(), user.name).then((res: any) => {
      if (res !== undefined) {
        return res.data
      }
    }),
  )
  console.log(data)
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
                      data.followed === true ? unFollow(user.name, data[0].name) : handleFollow(user.name, data[0].name)
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
            <PostData data={data.posts} />
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
