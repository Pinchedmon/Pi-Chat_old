import React, { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getUserData } from '../../../../api/auth'
import { UserContext } from '../../../../App'
import { useQuery } from 'react-query'
import ProfilePosts from './components/ProfilePosts'
import ProfileInfo from './components/ProfileInfo'

const Profile = () => {
  let location = useLocation()
  const user = useContext(UserContext)

  const { data, refetch } = useQuery('userData', () =>
    getUserData({ name: location.pathname.slice(1).toString(), username: user.name }).then((res: any) => {
      return res.data
    }),
  )
  useEffect(() => {
    refetch()
  }, [location.pathname])
  return (
    <>
      {data && (
        <div>
          <img className='profile-backImg' src={data[0].backImg} loading='lazy' alt='загружается...' />
          <ProfileInfo profile={data[0]} refetch={refetch} name={user.name} followed={data.followed} />
          <ProfilePosts pathname={location.pathname} name={data[0].name} />
        </div>
      )}
    </>
  )
}

export default Profile
