import React from 'react'
import { deletePost } from '../../utils/deletePost'

const Warning = (props: { id: number; refetch: () => void; setIsOpen: () => void }) => {
  return (
    <div className='post__warning'>
      <div className='post__warning-title'>Вы действительно уверены, что хотите удалить пост?</div>
      <button
        className='post__warning__button-yes'
        onClick={() => {
          deletePost({ id: props.id, refetch: props.refetch })
          props.setIsOpen()
        }}
      >
        Да
      </button>
      <button className='post__warning__button-no' onClick={() => props.setIsOpen()}>
        Нет
      </button>
    </div>
  )
}
export default Warning
