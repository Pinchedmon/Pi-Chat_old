import { PencilIcon } from '@heroicons/react/solid'
import React, { useState } from 'react'
import useAuth from '../../../../../../hooks/useAuth'
import { handleChange } from './utils/handleChange'
import { handleSubmit } from './utils/handleSubmit'
function EditText(props: { fetchPosts: () => void }) {
  const { user, refetchUser } = useAuth()
  const [status, setStatus] = useState(false)
  const [value, setValue] = useState(user.name)
  return (
    <>
      {status === false && (
        <div className='flex text-lg md:text-2xl  font-bold'>
          {user.username}
          <PencilIcon onClick={() => setStatus(!status)} className='ml-4px w-24px text-green-600' />
        </div>
      )}
      {status === true && (
        <input
          onMouseLeave={() => {
            setStatus(!status)
            handleSubmit(value, user.name, user.username, refetchUser)
          }}
          value={value}
          maxLength={14}
          onChange={(e: React.FormEvent<HTMLInputElement>) => handleChange(e, setValue)}
        />
      )}
    </>
  )
}

export default EditText
