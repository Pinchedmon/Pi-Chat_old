import React, { useContext, useState } from 'react'
import { UserContext } from '../../../../../../../../App'
import useAuth from '../../../../../../../../hooks/useAuth'
import { handleChange } from './utils/handleChange'
import { handleSubmit } from './utils/handleSubmit'
const EditInfo = (props: { refetch: () => void }) => {
  const { refetchUser } = useAuth()
  const user = useContext(UserContext)
  const [status, setStatus] = useState(false)
  const [value, setValue] = useState(user.info)
  return (
    <div className='border-2 dark:bg-white'>
      {status === false && <div className='text-md  '>{user.info}</div>}
      {status === true && (
        <input
          className='border-2  border-red-600 p-2px text-center'
          onMouseLeave={() => {
            setStatus(!status)
            handleSubmit(value.toString(), user.name, props.refetch, refetchUser, user.info)
          }}
          value={value}
          maxLength={16}
          onChange={(e: React.FormEvent<HTMLInputElement>) => handleChange(e, setValue)}
        />
      )}
      <div onClick={() => setStatus(true)} className='bg-green-600  text-white'>
        Изменить описание
      </div>
    </div>
  )
}

export default EditInfo
