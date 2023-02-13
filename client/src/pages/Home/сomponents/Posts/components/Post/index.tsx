import React, { useContext } from 'react'
import ProfileInfo from './ProfileInfo'
import Buttons from './Buttons'
import { useNavigate } from 'react-router-dom'
import Options from './Options'
import { UserContext } from '../../../../../../App'
import { Ipost } from '../../../PostPage/types/post.interface'

const Post = (props: {
  data: any
  refetch?: () => void
  deletePost: (x: number) => void
  likePost: (id: number, likes: number) => void
}) => {
  const { data, likePost, deletePost, refetch } = props
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
                <ProfileInfo
                  username={item.username}
                  name={item.name}
                  date={item.date}
                  onLink={() => navigate(`/${item.name}`)}
                />
              </div>
              <div className='post__info'>
                <div className='post__info-text'>{item.text}</div>
                {item.postImg !== '' && <img className='post__info-img' src={item.postImg} alt=' ' />}
              </div>
              <Buttons
                name={user.name}
                ID={item.ID}
                comments={item.comments}
                likes={item.likes}
                role={user!.role}
                likePost={likePost}
                liked={item.liked}
                postName={item.name}
              />
            </div>
            <Options id={item.ID} deletePost={deletePost} />
          </div>
        ))}
    </>
  )
}

export default Post
