import React from 'react'

const Warning = (props: { propsFunc: () => void; title: string; setIsOpen: () => void }) => {
  return (
    <div className='post__warning'>
      <div className='post__warning-title'>{props.title}</div>
      <button
        className='post__warning__button-yes'
        onClick={() => {
          props.propsFunc()
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
