import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getUserData } from '../../../../api/auth'
import { UserContext } from '../../../../App'
import { useQuery } from 'react-query'
import ProfilePosts from './components/ProfilePosts'
import ProfileInfo from './components/ProfileInfo'
import { Ipost } from '../PostPage/types/post.interface'

const Profile = () => {
  let page = 1
  let location = useLocation()
  const user = useContext(UserContext)
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
      {data && (
        <div className='h-full'>
          <img className='profile-backImg' src={data[0].backImg} alt='загружается...' />
          <ProfileInfo profile={data[0]} refetch={refetch} name={user.name} followed={data.followed} />
          <ProfilePosts name={data[0].name} />
        </div>
      )}
    </>
  )
}

export default Profile
