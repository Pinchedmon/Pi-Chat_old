import React from 'react'
import { AnnotationIcon, HeartIcon } from '@heroicons/react/solid'
import { useNavigate } from 'react-router-dom'
import { Ibuttons } from '../../../types/post.interface'
import { handleLike } from './utils/handleLike'

function Buttons(props: Ibuttons) {
  const navigate = useNavigate()
  const { refetch, name, ID, likes, comments } = props
  const showComments = async (id: number) => {
    navigate(`/post?id=${id}`)
  }

  return (
    <div className='post__buttons'>
      <button
        className='post__buttons__button mr-16px'
        onClick={() => {
          handleLike(ID, name, refetch)
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
