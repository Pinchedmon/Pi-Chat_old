import React from 'react'

const Warning = (props: { setIsOpen: () => void }) => {
  const { setIsOpen } = props
  return (
    <div className='dialogs-show-warning'>
      <div className='mb-16px'>Вы действительно уверены, что хотите заблокировать этого человека?</div>
      <button className='dialogs-show-warning-yes' onClick={() => {}}>
        Да
      </button>
      <button className='dialogs-show-warning-no' onClick={() => setIsOpen()}>
        Нет
      </button>
    </div>
  )
}

export default Warning
