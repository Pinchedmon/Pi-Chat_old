import React from 'react'
import { formatLeft } from '../../../../../../utils/dates'
// import { useNavigate } from 'react-router-dom'
import { Icomment } from '../../types/comment.interface'
import Buttons from './Buttons'
import Options from './Options'

const Comments = (props: {
  name: string
  data: Array<Icomment>
  refetch: () => void
  likeComment: (id: number, likes: number) => void
}) => {
  // const navigate = useNavigate()
  const { data, refetch, likeComment, name } = props
  return (
    <>
      {!data ? (
        <div className='no-comments'>Нет комментариев</div>
      ) : (
        <>
          {data &&
            data.map((item: Icomment, index: number) => (
              <div key={index} className='comment'>
                <img src={item.img} className='comment__img' onClick={undefined} alt='' />
                <div>
                  <div className='comment-info'>
                    <div className='comment-info-username'>{item.username}</div>
                    <p className='comment-info-time'>{formatLeft(item.date)}</p>
                  </div>
                  <div className='comment-info-text'>{item.text}</div>
                  <Buttons
                    likePost={likeComment}
                    name={name}
                    role={''}
                    ID={item.ID}
                    likes={item.likes}
                    comments={item.comments}
                  />
                  <Options id={item.ID} postId={item.postId} refetch={refetch} />
                  {item.commentImg !== '' && (
                    <img className='comment-info-img' src={item.commentImg} alt='загружается...' />
                  )}
                </div>
              </div>
            ))}
        </>
      )}
    </>
  )
}

export default Comments
