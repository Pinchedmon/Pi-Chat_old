import React, { useContext, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getUserData } from '../../../../api/auth'
import { UserContext } from '../../../../App'
import { useQuery } from 'react-query'
import ProfilePosts from './components/ProfilePosts'
import ProfileInfo from './components/ProfileInfo'

const Profile = () => {
  let location = useLocation()
  const user = useContext(UserContext)
  const [filter, setFilter] = useState(true)
  const { data, refetch } = useQuery(['userData'], () =>
    getUserData({ name: location.pathname.slice(1), username: user.name }).then((res: any) => {
      return res.data
    }),
  )
  useEffect(() => {
    refetch()
    setFilter(true)
  }, [location.pathname])
  const handleFilter = (x: any) => {
    setFilter(x)
  }
  return (
    <>
      {data && (
        <div>
          <img className='profile-backImg' src={data[0].backImg} loading='lazy' alt='загружается...' />
          <ProfileInfo profile={data[0]} refetch={refetch} name={user.name} followed={data.followed} />
          <ProfilePosts filter={filter} setFilter={handleFilter} pathname={location.pathname} name={data[0].name} />
        </div>
      )}
    </>
  )
}

export default Profile
