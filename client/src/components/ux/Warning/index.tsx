import React from 'react'
import AcceptBtn from './components/AcceptBtn'
import CancelBtn from './components/CancelBtn'
import { Iwarning } from './components/warning.interface'

const Warning = (props: Iwarning) => {
  const { propsFunc, setIsOpen } = props
  return (
    <div className='warning'>
      <div className='warning-title'>{props.title}</div>
      <AcceptBtn propsFunc={propsFunc} setIsOpen={setIsOpen} />
      <div className='float-right'>
        <CancelBtn setIsOpen={setIsOpen} />
      </div>
    </div>
  )
}
export default Warning
