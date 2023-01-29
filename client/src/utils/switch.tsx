import React from 'react'

const Switch = ({ isOn, handleToggle }: any) => {
  return (
    <>
      <input
        checked={isOn}
        onChange={handleToggle}
        className='react-switch-checkbox '
        id={`react-switch-new`}
        type='checkbox'
      />
      <label className=' react-switch-label' htmlFor={`react-switch-new`}>
        <span className={`react-switch-button`} />
      </label>
    </>
  )
}
export default Switch
