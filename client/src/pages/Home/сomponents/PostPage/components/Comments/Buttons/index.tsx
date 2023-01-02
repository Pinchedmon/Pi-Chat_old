import React from 'react'
import { AnnotationIcon, HeartIcon } from '@heroicons/react/solid'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setIsMenuShowed } from '../../../../../../../state/navReducer'
import { Ibuttons } from '../../../../Posts/types/post.interface'
import { handleLike } from '../utils/handleLike'

const Buttons = (props: Ibuttons) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { likePost, name, ID, likes, comments } = props
  const showComments = async (id: number) => {
    dispatch(setIsMenuShowed(false))
    navigate(`/post?id=${id}`)
  }

  return (
    <div className='post__buttons'>
      <button
        className='post__buttons__button mr-16px'
        onClick={() => {
          handleLike(ID, name, likePost)
        }}
      >
        <HeartIcon className='post__buttons__heart-icon' />
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
