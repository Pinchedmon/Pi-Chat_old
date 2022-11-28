import React from 'react'
import { IsendBtn } from './SendBtn.interface'

const SendBtn = (props: IsendBtn) => {
  const { validForm } = props
  return (
    <>
      <button disabled={!validForm} className='postPage-sendField-buttons__button'>
        Отправить
      </button>
    </>
  )
}

export default SendBtn
