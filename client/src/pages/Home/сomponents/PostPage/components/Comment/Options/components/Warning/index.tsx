import React from 'react'
import { handleDelete } from '../../utils/handleDelete'

const Warning = (props: { id: number; postId: number; refetch: () => void; setIsOpen: () => void }) => {
  const { id, postId, refetch, setIsOpen } = props
  return (
    <div className='postPage-warning'>
      <div className='postPage-warning-ask'>Вы действительно уверены, что хотите удалить комментарий?</div>
      <button
        className='postPage-warning__button'
        onClick={() => {
          handleDelete(id, postId, refetch)
          setIsOpen()
        }}
      >
        Да
      </button>
      <button className='postPage-warning__button ml-5px bg-gray-600 float-right ' onClick={() => setIsOpen()}>
        Нет
      </button>
    </div>
  )
}

export default Warning
