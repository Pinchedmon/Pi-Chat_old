import React from 'react'
import { createPortal } from 'react-dom'
import ModalArea from './ModalArea'

const Modal = ({ open, children, onClose }: any) => {
  if (!open) return null
  return createPortal(
    <>
      <ModalArea onClose={onClose} children={children} />
    </>,
    document.getElementById('portal'),
  )
}

export default Modal
