import React, { useContext } from 'react'
import useAuth from '../../../../../../../../hooks/useAuth'
import { sendFile } from './utils/sendFile'
import { UserContext } from '../../../../../../../../App'
const EditAvatar = (props: { refetch: () => void }) => {
  const { refetchUser } = useAuth()
  const user = useContext(UserContext)

  return (
    <div className='flex w-100px border-2 flex-col ml-16px mr-16px font-bold'>
      <img className='w-100px' src={user.pathImg} alt='загружается...' />
      <label className=' bg-green-600 text-sm text-white p-3px hover:bg-green-500 cursor-pointer'>
        <input
          type='file'
          className='hidden'
          accept='.png,.gif,.jpg,.jpeg'
          onChange={(e) =>
            sendFile(
              e,
              () => {
                refetchUser()
                props.refetch()
              },
              refetchUser,
              user.pathImg,
              user.name,
            )
          }
        />
        Изменить аву
      </label>
    </div>
  )
}
export default EditAvatar
