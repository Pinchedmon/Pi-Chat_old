import React, { useContext, useState } from 'react'
import { UserContext } from '../../../../../../../../App'
import useAuth from '../../../../../../../../hooks/useAuth'
import { handleChange } from './utils/handleChange'
import { handleSubmit } from './utils/handleSubmit'
function EditName(props: { refetch: () => void }) {
  const { refetchUser } = useAuth()
  const user = useContext(UserContext)
  const [status, setStatus] = useState(false)
  const [value, setValue] = useState(user.username)
  return (
    <div className='border-2  dark:bg-white w-200px'>
      {status === false && <div className='flex flex-col text-lg   font-bold '>{user.username}</div>}
      {status === true && (
        <input
          onMouseLeave={() => {
            setStatus(false)
            handleSubmit(value, user.name, user.username, props.refetch, refetchUser)
          }}
          value={value}
          maxLength={14}
          onChange={(e: React.FormEvent<HTMLInputElement>) => handleChange(e, setValue)}
          className='border-2 border-red-600 p-2px text-center'
        />
      )}
      <div onClick={() => setStatus(true)} className='bg-green-600 text-white'>
        Изменить имя
      </div>
    </div>
  )
}

export default EditName
