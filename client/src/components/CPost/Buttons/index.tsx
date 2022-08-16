import React from 'react'
import redaxios from 'redaxios'
import { AnnotationIcon, HeartIcon, XIcon } from '@heroicons/react/solid'
import { useNavigate } from 'react-router-dom'

function Buttons(props: {
  refetch: () => void
  name: string
  author: string
  role: string
  ID: number
  likes: number | string
  comments: number | string
}) {
  const navigate = useNavigate()
  const { refetch, name, role, author, ID, likes, comments } = props
  const showComments = async (id: number) => {
    navigate(`/post?id=${id}`)
  }
  const deleteButton = (id: number) => {
    redaxios.delete(`http://localhost:6060/posts/feed?id=${id}`).then((res) => {
      if (res.status === 200) {
        refetch()
      }
    })
  }
  return (
    <div className='mt-8px mb-8px flex flex-row items-center'>
      <button
        className='flex '
        onClick={() => {
          redaxios.put(`http://localhost:6060/posts/feed?postId=${ID}&profileName=${name}`).then((response) => {
            if (response.status === 200) {
              refetch()
            }
          })
        }}
      >
        <HeartIcon className='text-green-600 w-28px' />
        <span className='text-green-600 text-lg font-bold ml-6px'>{likes}</span>
      </button>
      <button className='flex items-center ml-16px' onClick={() => showComments(ID)}>
        <AnnotationIcon className='w-28px h-28x  text-green-600' />
        <span className='text-green-600 text-lg font-bold pb-4px p-4px'>{comments}</span>
      </button>
      {role !== 'ADMIN' ? (
        name === author ? (
          <button onClick={() => deleteButton(ID)} className=''>
            <XIcon className='h-24px w-24px text-green-600' />
          </button>
        ) : (
          ''
        )
      ) : (
        ''
      )}
      {role === 'ADMIN' && (
        <button onClick={() => deleteButton(ID)} className=''>
          <XIcon className='h-32px w-32px text-green-600' />
        </button>
      )}
    </div>
  )
}

export default Buttons
