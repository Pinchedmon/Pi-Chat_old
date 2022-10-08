import React, { useContext } from 'react'
import { handleEditBackground } from './utils/handleEditBackground'
import { UserContext } from '../../../../../../../../App'
import useAuth from '../../../../../../../../hooks/useAuth'
function EditBackground(props: { refetch: () => void }) {
  const user = useContext(UserContext)
  const { refetchUser } = useAuth()
  return (
    <div className='flex flex-col w-200px border-2 font-bold'>
      <img className='w-200px' src={user.backImg} alt='загружается...' />
      <label className='h-32px bg-green-600 text-sm text-white p-6px hover:bg-green-500 cursor-pointer'>
        <input
          type='file'
          className='hidden '
          accept='.png,.gif,.jpg,.jpeg'
          onChange={(e) =>
            handleEditBackground(
              e,
              () => {
                refetchUser()
                props.refetch()
              },
              user.backImg,
              user.name,
            )
          }
        />
        Изменить фон
      </label>
    </div>
  )
}

export default EditBackground
