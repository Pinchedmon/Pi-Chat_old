import React, { useState } from 'react'
import { HeartIcon } from '@heroicons/react/solid'
import { AnnotationIcon, HeartIcon as HeartIconOutline } from '@heroicons/react/outline'
import { useNavigate } from 'react-router-dom'
import { Ibuttons } from '../../../types/post.interface'
import { handleLike } from './utils/handleLike'
import { useDispatch } from 'react-redux'
import { setIsMenuShowed } from '../../../../../../../state/navReducer'

const Buttons = (props: Ibuttons) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { likePost, name, ID, likes, comments, liked } = props
  const showComments = async (id: number) => {
    dispatch(setIsMenuShowed(false))
    navigate(`/post?id=${id}`)
  }
  const [likedStatus, setLikedStatus] = useState(liked)

  return (
    <div className='post__buttons'>
      <button
        className='post__buttons__button mr-16px'
        onClick={() => {
          handleLike(ID, name, likePost)
          setLikedStatus(!likedStatus)
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
