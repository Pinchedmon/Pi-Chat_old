import { PencilIcon } from '@heroicons/react/solid'
import React, { useState } from 'react'
import redaxios from 'redaxios'
import useAuth from '../../../../hooks/useAuth'
function EditInfo() {
  const { user, refetchUser } = useAuth()
  const [status, setStatus] = useState(false)
  const [value, setValue] = useState(user.info)
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    setValue(target.value)
  }
  const handleSubmit = () => {
    redaxios.put(`http://localhost:6060/profile/info?text=${value.toString()}&name=${user.name}`).then((res) => {
      if (res.status === 200) {
        refetchUser()
      }
    })
  }
  return (
    <>
      {status === false && (
        <div className='flex text-md  '>
          {user.info}
          <PencilIcon onClick={() => setStatus(!status)} className='ml-4px w-24px text-green-600' />
        </div>
      )}
      {status === true && (
        <input
          className='w-220px'
          onMouseLeave={() => {
            setStatus(!status)
            handleSubmit()
          }}
          value={value}
          maxLength={42}
          onChange={(e: React.FormEvent<HTMLInputElement>) => handleChange(e)}
        />
      )}
    </>
  )
}

export default EditInfo
