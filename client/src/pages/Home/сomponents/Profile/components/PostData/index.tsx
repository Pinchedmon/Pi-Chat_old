import React, { useContext } from 'react'
import ProfileInfo from './ProfileInfo'
import Info from './Info'
import Buttons from './Buttons'
import { useNavigate } from 'react-router-dom'
import Options from './Options'
import { UserContext } from '../../../../../../App'

type iPost = {
  username: string
  name: string
  text: string
  postImg: string
  likes: number | string
  ID: number
  comments: number | string
  date: string
  time: string
  backImg: string
}

function PostData(props: any) {
  const { data } = props
  const navigate = useNavigate()
  const user = useContext(UserContext)

  return (
    <div>
      {data !== undefined &&
        data.map((item: iPost, index: string | number) => (
          <div key={index} className='w-full flex flex-row self-center mb-16px border-b-2 border-gray-300'>
            <div className='flex flex-col ml-24px '>
              <div className='flex'>
                <img
                  onClick={() => navigate(`/${item.name}`)}
                  className='mr-16px h-54px  rounded-xl w-54px cursor-pointer'
                  alt=''
                  src={item.backImg}
                />
                <ProfileInfo username={item.username} name={item.name} date={item.date} time={item.time} />
              </div>
              <Info text={item.text} img={item.postImg} />
              {/* <Buttons
                refetch={refetch}
                name={user.name}
                ID={item.ID}
                comments={item.comments}
                likes={item.likes}
                role={user.role}
              /> */}
            </div>
            {/* <Options id={item.ID} refetch={refetch} /> */}
          </div>
        ))}
    </div>
  )
}

export default PostData
