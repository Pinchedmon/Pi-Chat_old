import React from 'react'
import { Icomment } from '../../types/comment.interface'
import Options from './Options'

const Comments = (props: { data: Array<Icomment>; refetch: () => void }) => {
  const { data, refetch } = props
  return (
    <>
      {!data ? (
        <div className='no-comments'>Нет комментариев</div>
      ) : (
        <div>
          {data &&
            data.map((item: Icomment, index: number) => (
              <div key={index} className='comment'>
                <img src={item.img} className='comment__img' onClick={undefined} alt='' />
                <div>
                  <div className='comment-info'>
                    <div className='comment-info-username'>{item.username}</div>
                    <p className='comment-info-time'>
                      {item.date === new Date().toLocaleDateString() ? item.time : item.date}
                    </p>
                  </div>
                  <div className='comment-info-text'>{item.text}</div>
                  <Options id={item.ID} postId={item.postId} refetch={refetch} />
                  {item.commentImg !== '' && (
                    <img className='comment-info-img' src={item.commentImg} alt='загружается...' />
                  )}
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  )
}

export default Comments
