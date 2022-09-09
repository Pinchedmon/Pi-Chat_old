import { PencilIcon } from '@heroicons/react/solid'
import React, { useState } from 'react'

import useAuth from '../../../../../../hooks/useAuth'
import { handleChange } from './utils/handleChange'
import { handleSubmit } from './utils/handleSubmit'
function EditInfo() {
  const { user, refetchUser } = useAuth()
  const [status, setStatus] = useState(false)
  const [value, setValue] = useState(user.info)

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
            handleSubmit(value.toString(), user.name, refetchUser, user.info)
          }}
          value={value}
          maxLength={42}
          onChange={(e: React.FormEvent<HTMLInputElement>) => handleChange(e, setValue)}
        />
      )}
    </>
  )
}

export default EditInfo
