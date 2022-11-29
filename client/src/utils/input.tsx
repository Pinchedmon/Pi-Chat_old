import React from 'react'
export interface Iinput {
  value: string | number
  blurHandler: (e: any) => void
  handleChange: (e: any) => void
  name: string
  placeholder: string
  type: any
}
function Input(props: Iinput) {
  const { value, blurHandler, handleChange, name, placeholder, type } = props
  return (
    <>
      <input
        className='login-form__input'
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onBlur={(e) => blurHandler(e)}
        onChange={(e) => handleChange(e)}
      />
    </>
  )
}

export default Input
