import React, { useContext, useState } from 'react'
import { HeartIcon } from '@heroicons/react/solid'
import { AnnotationIcon, HeartIcon as HeartIconOutline } from '@heroicons/react/outline'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setIsMenuShowed } from '../../../../../../../state/navReducer'
import { Ibuttons } from '../../../../Posts/types/post.interface'
import { handleLike } from '../utils/handleLike'
import { SocketContext } from '../../../../..'

const Buttons = (props: Ibuttons) => {
  const socket = useContext(SocketContext)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { likePost, name, ID, likes, comments, liked, postName } = props
  const showComments = async (id: number) => {
    dispatch(setIsMenuShowed(false))
    navigate(`/post?id=${id}`)
  }
  const handleCommentLike = (type: number) => {
    handleLike(ID, name, likePost)
    setLikedStatus(!likedStatus)
    if (!likedStatus) {
      socket.emit('sendNotification', {
        senderName: name,
        receiverName: postName,
        type,
      })
    }
  }
  const [likedStatus, setLikedStatus] = useState(liked)
  return (
    <div className='post__buttons'>
      <button
        className='post__buttons__button mr-16px'
        onClick={() => {
          handleCommentLike(2)
        }}
      >
        {likedStatus && <HeartIcon className='post__buttons__heart-icon' />}
        {!likedStatus && <HeartIconOutline className='post__buttons__heart-icon' />}
        <p className='post__buttons__text '>{likes}</p>
      </button>
      <button className='post__buttons__button' onClick={() => showComments(ID)}>
        <AnnotationIcon className='post__buttons__comment-icon' />
        <p className='post__buttons__text'>{comments}</p>
      </button>
    </div>
  )
}

export default Buttons
