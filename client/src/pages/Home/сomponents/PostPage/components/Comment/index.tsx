import { PaperAirplaneIcon, PaperClipIcon } from '@heroicons/react/solid'
import React, { useState } from 'react'
import { formatLeft } from '../../../../../../utils/dates'
import Buttons from '../Comments/Buttons'
import Options from '../Comments/Options'
import TextareaAutosize from 'react-textarea-autosize'
import { Icomment } from '../../types/comment.interface'
import { postComment } from '../../../../../../api/post'
const Comment = (props: {
  item: Icomment
  index: number
  likeComment: (id: number, likes: number) => void
  name: string
  refetch: () => void
  postId: number
  isMain: boolean
}) => {
  const { index, item, likeComment, name, refetch, postId, isMain } = props
  const [TAData, setTAData] = useState('')
  return (
    <>
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
          {isMain && (
            <div className='flex mb-4px h-28px'>
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
                style={{ height: 28 }}
                className=' border-2  pb-2px rounded-xl w-full text-sm pt-2px pl-8px resize-none h-32px'
                placeholder='Написать коммент'
              />
              <button
                disabled={TAData === ''}
                className='ml-4px mr-28px'
                onClick={() =>
                  postComment(
                    {
                      commentId: item.ID,
                      id: postId,
                      name: name,
                      refetch: () => {
                        refetch()
                        setTAData('')
                      },
                      text: TAData,
                    },
                    '',
                  )
                }
              >
                <PaperAirplaneIcon className='w-18px text-green-600' />
              </button>
            </div>
          )}
          {item.commentImg !== '' && <img className='comment-info-img' src={item.commentImg} alt='загружается...' />}
        </div>
      </div>
    </>
  )
}

export default Comment
