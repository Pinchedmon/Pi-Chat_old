import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import UserImg from './UserImg'
import ProfileInfo from './ProfileInfo'
import Info from './Info'
import Buttons from './Buttons'

type iPost = {
  userImg: string
  author: string
  username: string
  text: string
  postImg: string
  likes: number | string
  ID: number
  comments: number | string
}

function CPost(props: { getPost: (getObject: any) => Promise<any>; naming: string; getObject: any }) {
  const { getPost, naming, getObject } = props
  const [posts, setPosts] = useState([])
  const navigate = useNavigate()
  const { user } = useAuth()
  let name = user.user.name
  const { data, refetch } = useQuery(naming, () => getPost(getObject), {})
  useEffect(() => {
    setPosts(data)
  }, [data])
  return (
    <div>
      {posts !== undefined &&
        posts.map((item: iPost, index: string | number) => (
          <div key={index} className='w-full flex  self-center mb-16px border-b-2 border-gray-300'>
            <UserImg name={item.author} userImg={item.userImg} />
            <div className='flex flex-col'>
              <ProfileInfo name={item.author} username={item.username} />
              <Info text={item.text} img={item.postImg} />
              <Buttons
                refetch={refetch}
                author={item.author}
                name={user.user.name}
                ID={item.ID}
                comments={item.comments}
                likes={item.likes}
                role={user.user.role}
              />
            </div>
          </div>
        ))}
    </div>
  )
}

export default CPost
