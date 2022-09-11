import React, { useEffect, useState } from 'react'
import { ArrowLeftIcon, ChatAlt2Icon } from '@heroicons/react/solid'
import { getMyPosts } from '../../../../api/get'
import { useLocation, useNavigate } from 'react-router-dom'
import { getUserData } from '../../../../api/auth'
import { useDispatch, useSelector } from 'react-redux'
import { setAddMessageStyle } from '../../../../state/navReducer'
import AddMessage from './AddMessage'
import PostData from '../Posts/components/Post/components/PostData'

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
  }
}
function UserProfile() {
  const navigate = useNavigate()
  let location = useLocation()
  const dispatch = useDispatch()
  const style = useSelector((state: IState) => state.nav.addMessageStyle)
  const showMessage = () => {
    dispatch(setAddMessageStyle(!style))
  }
  const [user, setUser] = useState<IUser>({ backImg: '', pathImg: '', name: '', username: '', info: '' })
  useEffect(() => {
    getUserData(location.pathname.slice(1).toString()).then((res: { data: { 0: IUser } }) => {
      if (res.data[0] !== undefined) {
        setUser(res.data[0])
      }
    })
  }, [])
  return (
    <>
      {user.name !== '' && (
        <div>
          {/* exit */}
          <div className='border-b-2 border-gray-300 p-16px ' onClick={() => navigate('/')}>
            <ArrowLeftIcon className='w-48px text-green-600 rounded-md bg-gray-100 p-6px hover:bg-green-600 hover:text-white' />
          </div>
          {/* profile */}
          {/* background photo */}
          <img className=' h-200px w-full' src={user.backImg} alt='загружается...' />
          {/* icon */}
          <div className='w-full flex mt-16px self-center border-b-2 border-gray-300 pb-16px'>
            <img className=' rounded-xl w-100px ml-16px mr-16px' src={user.pathImg} alt='загружается...' />
            <div className='flex w-full flex-col'>
              {/* naming */}
              <div className='flex items-center align-center w-full  -mt-6px'>
                <div className='font-bold text-2xl'>{user.username}</div>
                <p className='ml-8px font-bold text-md text-gray-500'>@{user.name}</p>
              </div>
              {/* info */}
              <div>{user.info}</div>
              <div onClick={showMessage} className='mt-16px flex cursor-pointer items-center text-green-600'>
                <ChatAlt2Icon className='w-32px mr-8px  ' />
                <p>Написать сообщение</p>
              </div>
            </div>
          </div>
          {/* posts */}
          <div className='mt-16px'>
            <PostData getPost={getMyPosts} naming='myPosts' getObject={user.name} />
          </div>
          {style === true && <AddMessage name={user.name} showMessage={() => dispatch(setAddMessageStyle(!style))} />}
        </div>
      )}
    </>
  )
}

export default UserProfile
