import React, { useCallback } from 'react'
import redaxios from 'redaxios'
import { useQuery } from 'react-query'
import { PencilIcon } from '@heroicons/react/solid'
import useAuth from '../../../../hooks/useAuth'
import { getCurrentUser } from '../../../../api/users'
const FilesUploadComponent = () => {
  let { user } = useAuth()
  let name = user.user.name
  const { refetch } = useQuery('profile', () => getCurrentUser(user.authToken))
  const sendFile = useCallback(
    async (e: React.SyntheticEvent<HTMLInputElement, Event>) => {
      const target = e.target as HTMLInputElement
      const fdata = new FormData()
      fdata.append('avatar', target.files[0])
      await redaxios.put(`http://localhost:6060/profile/img?name="${name}"`, fdata).then((response) => {
        if (response.status === 200) {
          user.user.pathImg = response.data.data
          refetch()
        }
      })
    },
    [name, user.user, refetch],
  )
  return (
    <div>
      <div className='relative ml-16px mr-16px'>
        <img className=' rounded-xl w-100px' src={user.user.pathImg} alt='загружается...' />
        <label className='cursor-pointer'>
          <input type='file' className='hidden' accept='.png,.gif,.jpg,.jpeg' onChange={(e) => sendFile(e)} />
          <PencilIcon className='absolute bottom-0px right-0px rounded-tl-lg text-white bg-green-600 w-24px hover:bg-green-500' />
        </label>
      </div>
    </div>
  )
}
export default FilesUploadComponent
