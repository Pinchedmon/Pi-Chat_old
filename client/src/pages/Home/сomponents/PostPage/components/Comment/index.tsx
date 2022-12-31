import React, { useState } from 'react'

import { formatLeft } from '../../../../../../utils/dates'
// import { useNavigate } from 'react-router-dom'
import { Icomment } from '../../types/comment.interface'
import Buttons from './Buttons'
import Options from './Options'
import TextareaAutosize from 'react-textarea-autosize'
import { PaperAirplaneIcon, PaperClipIcon } from '@heroicons/react/solid'
const Comments = (props: {
  name: string
  data: Array<Icomment>
  refetch: () => void
  likeComment: (id: number, likes: number) => void
}) => {
  // const navigate = useNavigate()
  const { data, refetch, likeComment, name } = props
  const [TAData, setTAData] = useState('')
  return (
    <>
      {data.length === 0 ? (
        <div className='no-comments'>Нет комментариев</div>
      ) : (
        <>
          {data &&
            data.map((item: Icomment, index: number) => (
              <div key={index} className='comment'>
                <img src={item.img} className='comment__img' onClick={undefined} alt='' />
                <div className='w-full'>
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
                  <div className='flex mb-4px'>
                    <label className='flex mr-4px'>
                      <input type='file' className='hidden' accept='.png,.gif,.jpg,.jpeg' />
                      <i>
                        <PaperClipIcon className='w-28px text-white bg-green-600 p-6px rounded-xl' />
                      </i>
                    </label>

                    <TextareaAutosize
                      cacheMeasurements
                      onChange={(e) => {
                        setTAData(e.target.value)
                      }}
                      value={TAData}
                      className='border-2 rounded-xl w-full  text-sm resize-none pl-8px pt-2px  '
                      placeholder='Написать коммент'
                    />
                    <button className='ml-4px mr-28px'>
                      <PaperAirplaneIcon className='w-18px text-green-600' />
                    </button>
                  </div>
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
