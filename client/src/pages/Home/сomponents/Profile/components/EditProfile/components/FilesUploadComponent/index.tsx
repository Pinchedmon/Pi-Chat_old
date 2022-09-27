import React, { useContext } from 'react'
import { useQuery } from 'react-query'
import useAuth from '../../../../../../../../hooks/useAuth'
import { getCurrentUser } from '../../../../../../../../api/auth'
import { sendFile } from './utils/sendFile'
import { UserContext } from '../../../../../../../../App'
const EditAvatar = () => {
  const { refetchUser } = useAuth()
  const user = useContext(UserContext)
  const { refetch } = useQuery('profile', () => getCurrentUser())
  return (
    <div className='flex w-100px border-2 flex-col ml-16px mr-16px font-bold'>
      <img className='w-100px' src={user.pathImg} alt='загружается...' />
      <label className=' bg-green-600 text-sm text-white p-3px hover:bg-green-500 cursor-pointer'>
        <input
          type='file'
          className='hidden'
          accept='.png,.gif,.jpg,.jpeg'
          onChange={(e) => sendFile(e, refetch, refetchUser, user.pathImg, user.name)}
        />
        Изменить аву
      </label>
    </div>
  )
}
export default EditAvatar
