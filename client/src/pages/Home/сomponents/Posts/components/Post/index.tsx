import React, { useContext } from 'react'
import ProfileInfo from './ProfileInfo'
import Info from './Info'
import Buttons from './Buttons'
import { useNavigate } from 'react-router-dom'
import Options from './Options'
import { UserContext } from '../../../../../../App'
import { Ipost } from '../../../PostPage/types/post.interface'

const Post = (props: { data: any; refetch: () => void }) => {
  const { data, refetch } = props
  const navigate = useNavigate()
  const user = useContext(UserContext)
  return (
    <div>
      {data &&
        data.map((item: Ipost, index: number) => (
          <div key={index} className='posts'>
            <div className='post'>
              <div className='flex'>
                <img src={item.pathImg} alt='' onClick={() => navigate(`/${item.name}`)} className='post__img' />
                <ProfileInfo username={item.username} name={item.name} date={item.date} time={item.time} />
              </div>
              <Info text={item.text} img={item.postImg} />
              <Buttons
                name={user!.name}
                ID={item.ID}
                comments={item.comments}
                likes={item.likes}
                role={user!.role}
                refetch={refetch}
              />
            </div>
            <Options id={item.ID} refetch={refetch} />
          </div>
        ))}
    </div>
  )
}

export default Post
