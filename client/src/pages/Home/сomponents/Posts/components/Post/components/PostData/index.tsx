import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
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
          <div key={index} className='w-full flex flex-row self-center mb-16px border-b-2 border-gray-300'>
            <Buttons
              refetch={refetch}
              name={user.name}
              ID={item.ID}
              comments={item.comments}
              likes={item.likes}
              role={user.role}
            />
            <div>
              <div className='flex'>
                <Img
                  name={item.name}
                  onClick={() => navigate(`/${item.name}`)}
                  className='mr-16px h-54px  rounded-xl w-54px cursor-pointer'
                />
                <ProfileInfo name={item.name} />
              </div>
              <Info text={item.text} img={item.postImg} />
            </div>

            <div className='flex flex-row'></div>
          </div>
        ))}
    </div>
  )
}

export default PostData
