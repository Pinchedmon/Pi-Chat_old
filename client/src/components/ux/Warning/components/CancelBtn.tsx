import React from 'react'
interface IcancelBtn {
  setIsOpen: () => void
}
const CancelBtn = (props: IcancelBtn) => {
  return (
    <>
      <button className='warning__button-no' onClick={() => props.setIsOpen()}>
        Нет
      </button>
    </>
  )
}

export default CancelBtn
