import React, { useEffect, useState } from 'react'
import { ArrowLeftIcon } from '@heroicons/react/solid'
import { getMyPosts } from '../../../../api/get'
import { useLocation, useNavigate } from 'react-router-dom'
import { getUserData } from '../../../../api/auth'
import { useDispatch, useSelector } from 'react-redux'
import { setAddMessageStyle, setEditProfileStyle } from '../../../../state/navReducer'
import AddMessage from './components/AddMessage'
import PostData from '../Posts/components/Post/components/PostData'
import Options from './components/Options'
import EditProfile from './components/EditProfile'

interface IUser {
  backImg: string
  pathImg: string
  name: string
  username: string
  info: string
}
interface IState {
  nav: {
    addMessageStyle: boolean
    editProfileStyle: boolean
  }
}
function Profile() {
  const navigate = useNavigate()
  let location = useLocation()
  const dispatch = useDispatch()
  const addMessageStatus = useSelector((state: IState) => state.nav.addMessageStyle)
  const editProfileStatus = useSelector((state: IState) => state.nav.editProfileStyle)
  const [profile, setProfile] = useState<IUser>({ backImg: '', pathImg: '', name: '', username: '', info: '' })
  useEffect(() => {
    getUserData(location.pathname.slice(1).toString()).then((res: { data: { 0: IUser } }) => {
      if (res.data[0] !== undefined) {
        setProfile(res.data[0])
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      {profile.name !== '' && (
        <div>
          {/* exit */}
          <div className='border-b-2 border-gray-300 p-16px ' onClick={() => navigate('/')}>
            <ArrowLeftIcon className='w-48px text-green-600 rounded-md bg-gray-100 p-6px hover:bg-green-600 hover:text-white' />
          </div>
          {/* profile */}
          {/* background photo */}
          <img className=' h-200px w-full' src={profile.backImg} alt='загружается...' />
          {/* icon */}
          <div className='w-full flex mt-16px self-center border-b-2 border-gray-300 pb-16px'>
            <img className=' rounded-xl w-100px h-100px ml-16px mr-16px' src={profile.pathImg} alt='загружается...' />
            <div className='flex w-full flex-col'>
              {/* naming */}
              <div className='flex items-center align-center w-full  -mt-6px'>
                <div className='font-bold text-2xl'>{profile.username}</div>
                <p className='ml-8px font-bold text-md text-gray-500'>@{profile.name}</p>
              </div>
              {/* info */}
              <div>{profile.info}</div>
            </div>
            <Options id={0} identity={true} />
          </div>
          {/* posts */}
          <div className='mt-16px'>
            <PostData getPost={getMyPosts} naming='myPosts' getObject={profile.name} />
          </div>
          {addMessageStatus === true && (
            <AddMessage name={profile.name} showMessage={() => dispatch(setAddMessageStyle(!addMessageStatus))} />
          )}
          {editProfileStatus === true && (
            <EditProfile name={profile.name} showMessage={() => dispatch(setEditProfileStyle(!editProfileStatus))} />
          )}
        </div>
      )}
    </>
  )
}

export default Profile
