import React from 'react'
import useAuth from '../../../hooks/useAuth'
import redaxios from 'redaxios'
import { getCurrentUser } from '../../../api/auth'
import { useQuery } from 'react-query'
function EditBackground() {
  const { user } = useAuth()
  const name = user.name
  const { refetch } = useQuery('profile', () => getCurrentUser())
  const handleEditBackground = async (e: React.SyntheticEvent<HTMLInputElement, Event>) => {
    const target = e.target as HTMLInputElement
    const data = new FormData()
    data.append('backImg', target.files[0])
    await redaxios.put(`http://localhost:6060/profile/backImg?name=${name}`, data).then((res) => {
      user.backImg = res.data.data
      refetch()
    })
  }

  return (
    <div className='relative'>
      <img className=' h-200px w-full' src={user.backImg} alt='загружается...' />
      <label className='absolute bg-green-600 text-sm text-white bottom-0px right-100px rounded-t-lg p-6px hover:bg-green-500'>
        <input type='file' className='hidden' accept='.png,.gif,.jpg,.jpeg' onChange={(e) => handleEditBackground(e)} />
        Изменить фон
      </label>
    </div>
  )
}

export default EditBackground
