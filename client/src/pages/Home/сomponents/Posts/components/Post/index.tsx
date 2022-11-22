import React, { useContext } from 'react'
import ProfileInfo from './ProfileInfo'
import Info from './Info'
import Buttons from './Buttons'
import { useNavigate } from 'react-router-dom'
import Options from './Options'
import { UserContext } from '../../../../../../App'
import { Ipost } from '../../../PostPage/types/post.interface'

const Post = (props: {
  data: any

  deletePost: (x: number) => void
  likePost: (id: number, likes: number) => void
}) => {
  const { data, likePost, deletePost } = props
  const navigate = useNavigate()
  const user = useContext(UserContext)

  return (
    <>
      {data &&
        data.map((item: Ipost, index: number) => (
          <div key={index} className='posts'>
            <div className='post'>
              <div className='flex'>
                <img className='post__img' src={item.pathImg} alt='' onClick={() => navigate(`/${item.name}`)} />
                <ProfileInfo username={item.username} name={item.name} date={item.date} />
              </div>
              <Info text={item.text} img={item.postImg} />
              <Buttons
                name={user!.name}
                ID={item.ID}
                comments={item.comments}
                likes={item.likes}
                role={user!.role}
                likePost={likePost}
              />
            </div>
            <Options id={item.ID} deletePost={deletePost} />
          </div>
        ))}
    </>
  )
}

export default Post
