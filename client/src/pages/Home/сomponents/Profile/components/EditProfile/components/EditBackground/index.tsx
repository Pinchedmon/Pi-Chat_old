import React, { useContext } from 'react'
import { getCurrentUser } from '../../../../../../../../api/auth'
import { useQuery } from 'react-query'
import { handleEditBackground } from './utils/handleEditBackground'
import { UserContext } from '../../../../../../../../App'
function EditBackground() {
  const user = useContext(UserContext)
  const { refetch } = useQuery('profile', () => getCurrentUser())
  return (
    <div className='relative'>
      <img className=' h-200px w-full' src={user.backImg} alt='загружается...' />
      <label className='absolute bg-green-600 text-sm text-white bottom-0px right-100px rounded-t-lg p-6px hover:bg-green-500'>
        <input
          type='file'
          className='hidden'
          accept='.png,.gif,.jpg,.jpeg'
          onChange={(e) => handleEditBackground(e, refetch, user.backImg, user.name)}
        />
        Изменить фон
      </label>
    </div>
  )
}

export default EditBackground
