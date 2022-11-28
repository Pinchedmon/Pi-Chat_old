import React from 'react'
import { IacceptBtn } from './AcceptBtn.interface'

const AcceptBtn = (props: IacceptBtn) => {
  return (
    <>
      <button
        className='warning__button-yes'
        onClick={() => {
          props.propsFunc()
          props.setIsOpen()
        }}
      >
        Да
      </button>
    </>
  )
}

export default AcceptBtn
