import React from 'react'
import { createPortal } from 'react-dom'

const Modal = ({ open, children, onClose }: any) => {
  if (!open) return null
  return createPortal(
    <>
      <div className='modal-overlay' onClick={onClose} />
      <div className='modal'>
        {/* <button>Close Modal</button> */}
        {children}
      </div>
    </>,
    document.getElementById('portal'),
  )
}

export default Modal
