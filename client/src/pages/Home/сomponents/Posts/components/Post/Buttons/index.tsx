import React from 'react'
import axios from 'axios'
import { AnnotationIcon, HeartIcon } from '@heroicons/react/solid'
import { useNavigate } from 'react-router-dom'
import { Ibuttons } from '../../../types/post.interface'

function Buttons(props: Ibuttons) {
  const navigate = useNavigate()
  const { refetch, name, ID, likes, comments } = props
  const showComments = async (id: number) => {
    navigate(`/post?id=${id}`)
  }
  return (
    <div className=' mb-8px flex w-54px align-center items-center'>
      <button
        className='flex mr-16px'
        onClick={() => {
          axios.put(`http://localhost:6060/posts/feed?postId=${ID}&profileName=${name}`).then((response) => {
            if (response.status === 200) {
              refetch()
            }
          })
        }}
      >
        <HeartIcon className='text-green-600 mr-8px w-28px' />
        <p className='text-green-600 text-lg font-bold '>{likes}</p>
      </button>
      <button className='flex ' onClick={() => showComments(ID)}>
        <AnnotationIcon className='w-28px h-28x mr-8px   text-green-600' />
        <p className='text-green-600 text-lg font-bold'>{comments}</p>
      </button>
    </div>
  )
}

export default Buttons
