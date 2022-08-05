import React from 'react'

function CustomInput(name: string, type: string) {
  return (
    <>
      <input
        className='w-220px ml-auto mr-auto rounded-xl font-bold p-3px mb-16px text-center border-3 border-green-600'
        placeholder={name}
        name={name}
        type={type}
        // onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => onBlur(e)}
        // onChange={onChange}
      ></input>
    </>
  )
}

export default CustomInput
