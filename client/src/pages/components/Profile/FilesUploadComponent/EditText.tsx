import { PencilIcon } from '@heroicons/react/solid'
import React, { useState } from 'react'

function EditText(props: { name: string }) {
  const { name } = props
  const [status, setStatus] = useState(false)
  const [value, setValue] = useState(name)
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    setValue(target.value)
  }
  return (
    <>
      {status === false && <div className='text-lg md:text-2xl  font-bold'>{name}</div>}
      {status === true && (
        <input value={value} maxLength={14} onChange={(e: React.FormEvent<HTMLInputElement>) => handleChange(e)} />
      )}
      <button onClick={() => setStatus(!status)}>
        <PencilIcon className='ml-4px w-24px text-green-600' />
      </button>
    </>
  )
}

export default EditText
