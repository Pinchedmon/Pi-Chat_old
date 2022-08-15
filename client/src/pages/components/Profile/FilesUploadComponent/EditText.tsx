import { PencilIcon } from '@heroicons/react/solid'
import React, { useState } from 'react'
import redaxios from 'redaxios'
import useAuth from '../../../../hooks/useAuth'
function EditText() {
  const { user } = useAuth()
  const [status, setStatus] = useState(false)
  const [value, setValue] = useState(user.user.name)
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    setValue(target.value)
  }
  const handleSubmit = () => {
    redaxios
      .put(`http://localhost:6060/profile/name?username=${value.toString()}&name=${user.user.name}`)
      .then((res) => {
        if (res.status === 200) {
          user.user.username = value
        }
      })
  }
  return (
    <>
      {status === false && (
        <div className='flex text-lg md:text-2xl  font-bold'>
          {user.user.username}
          <PencilIcon onClick={() => setStatus(!status)} className='ml-4px w-24px text-green-600' />
        </div>
      )}
      {status === true && (
        <input
          onMouseLeave={() => {
            setStatus(!status)
            handleSubmit()
          }}
          value={value}
          maxLength={14}
          onChange={(e: React.FormEvent<HTMLInputElement>) => handleChange(e)}
        />
      )}
    </>
  )
}

export default EditText
