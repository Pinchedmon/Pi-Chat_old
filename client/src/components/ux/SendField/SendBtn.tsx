import React from 'react'
export interface IsendBtn {
  validForm: boolean
}
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
