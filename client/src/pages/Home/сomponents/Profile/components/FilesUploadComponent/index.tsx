import React, { useCallback } from 'react'
import redaxios from 'redaxios'
import { useQuery } from 'react-query'
import { PencilIcon } from '@heroicons/react/solid'
import useAuth from '../../../../../../hooks/useAuth'
import { getCurrentUser } from '../../../../../../api/auth'
import { sendFile } from './utils/sendFile'
const FilesUploadComponent = (props: { fetchPosts: () => void }) => {
  let { user, refetchUser } = useAuth()
  const { refetch } = useQuery('profile', () => getCurrentUser())
  return (
    <div>
      <div className='relative ml-16px mr-16px'>
        <img className=' rounded-xl w-100px' src={user.pathImg} alt='загружается...' />
        <label className='cursor-pointer'>
          <input
            type='file'
            className='hidden'
            accept='.png,.gif,.jpg,.jpeg'
            onChange={(e) => sendFile(e, refetch, refetchUser, user.pathImg, user.name)}
          />
          <PencilIcon className='absolute bottom-0px right-0px rounded-tl-lg text-white bg-green-600 w-24px hover:bg-green-500' />
        </label>
      </div>
    </div>
  )
}
export default FilesUploadComponent
