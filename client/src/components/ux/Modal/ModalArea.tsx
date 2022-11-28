import React from 'react'
export interface Imodal {
  onClose: () => void
  children: React.ReactNode
}
function ModalArea(props: Imodal) {
  const { onClose, children } = props
  return (
    <>
      {' '}
      <div className='modal-overlay' onClick={onClose} />
      <div className='modal'>{children}</div>
    </>
  )
}

export default ModalArea
