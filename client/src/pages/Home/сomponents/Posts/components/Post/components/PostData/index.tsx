import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import UserImg from './UserImg'
import ProfileInfo from './ProfileInfo'
import Info from './Info'
import Buttons from './Buttons'
import { UserContext } from '../../../../../../../../App'
import Img from '../../../../../../../../components/ui/Img'
import { useNavigate } from 'react-router-dom'

type iPost = {
  name: string
  text: string
  postImg: string
  likes: number | string
  ID: number
  comments: number | string
}

function PostData(props: { getPost: (getObject: any) => Promise<any>; naming: string; getObject: any }) {
  const { getPost, naming, getObject } = props
  const [posts, setPosts] = useState([])
  const navigate = useNavigate()
  const user = useContext(UserContext)
  const { data, refetch } = useQuery(naming, () => getPost(getObject), {})
  useEffect(() => {
    setPosts(data)
  }, [data])
  return (
    <div>
      {posts !== undefined &&
        posts.length > 0 &&
        posts.map((item: iPost, index: string | number) => (
          <div key={index} className='w-full flex  self-center mb-16px border-b-2 border-gray-300'>
            {/* <UserImg name={item.author} userImg={item.userImg} /> */}
            <Img
              name={item.name}
              onClick={() => navigate(`/${item.name}`)}
              className='ml-24px mr-16px h-54px rounded-xl w-54px cursor-pointer'
            />
            <div className='flex flex-col'>
              <ProfileInfo name={item.name} />
              <Info text={item.text} img={item.postImg} />
              <Buttons
                refetch={refetch}
                name={user.name}
                ID={item.ID}
                comments={item.comments}
                likes={item.likes}
                role={user.role}
              />
            </div>
          </div>
        ))}
    </div>
  )
}

export default PostData
