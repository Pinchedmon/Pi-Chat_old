import { PaperAirplaneIcon, PaperClipIcon } from '@heroicons/react/solid'
import React, { useContext, useState } from 'react'
import { formatLeft } from '../../../../../../utils/dates'
import Buttons from '../Comments/Buttons'
import Options from '../Comments/Options'
import TextareaAutosize from 'react-textarea-autosize'
import { Icomment } from '../../types/comment.interface'
import { postComment } from '../../../../../../api/post'
import { UserContext } from '../../../../../../App'
import { SocketContext } from '../../../..'
import { useNavigate } from 'react-router-dom'

const Comment = (props: {
  item: Icomment
  index: number
  deleteComment: (id: number) => void
  addComment: (comment: Icomment) => void
  likeComment: (id: number, likes: number) => void
  name: string
  postId: number
  isMain: boolean
}) => {
  const navigate = useNavigate()
  const user = useContext(UserContext)
  const socket = useContext(SocketContext)
  const { index, item, name, deleteComment, addComment, likeComment, postId, isMain } = props
  const [TAData, setTAData] = useState('')
  const [file, setFile] = useState(null)
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData()
    formData.append('comment', file)
    event.preventDefault()
    postComment(
      {
        commentId: item.ID,
        id: postId,
        name: user.name,
        refetch: (comment: Icomment) => {
          setTAData('')
          addComment(comment)
        },
        text: TAData,
        commentName: item.name,
        socket: socket,
      },
      formData,
    )
  }
  return (
    <>
      <div key={index} className='comment'>
        <img
          src={item.img}
          className='comment__img hover:cursor-pointer'
          onClick={() => navigate(`/${item.name}`)}
          alt=''
        />
        <div className='w-full'>
          <div className='comment-info '>
            <div onClick={() => navigate(`/${item.name}`)} className='comment-info-username hover:cursor-pointer'>
              {item.username}
            </div>
            <p className='comment-info-time'>{formatLeft(item.date)}</p>
          </div>
          <div className='comment-info-text'>{item.text}</div>
          <Buttons
            likeComment={likeComment}
            name={name}
            role={''}
            ID={item.ID}
            likes={item.likes}
            comments={item.comments}
            liked={item.liked}
            postName={item.name}
          />
          <Options id={item.ID} postId={item.postId} refetch={deleteComment} commentId={Number(item.commentId)} />
          {isMain && (
            <form className='flex mb-4px h-28px' onSubmit={(event) => handleSubmit(event)}>
              <label className='flex mr-4px'>
                <input
                  onChange={(e) => setFile(e.target.files[0])}
                  type='file'
                  className='hidden'
                  accept='.png,.gif,.jpg,.jpeg'
                />
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
                maxRows={3}
                style={{ height: 28 }}
                className='border-2 pb-2px rounded-xl w-full text-sm pt-2px pl-8px resize-none h-32px'
                placeholder='Написать коммент'
              />
              <button disabled={TAData === '' && file === null} className='ml-4px mr-28px'>
                <PaperAirplaneIcon className='w-18px text-green-600' />
              </button>
            </form>
          )}
          {item.commentImg !== '' && <img className='comment-info-img' src={item.commentImg} alt='загружается...' />}
        </div>
      </div>
    </>
  )
}

export default Comment
