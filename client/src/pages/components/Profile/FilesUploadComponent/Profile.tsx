import React, { useEffect, useState } from 'react'
import useAuth from '../../../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import FilesUploadComponent from './FilesUploadComponent'
import { useQuery } from 'react-query'
import { getMyPosts, getPath } from '../../../../api/session'
import { ArrowLeftIcon, DotsVerticalIcon } from '@heroicons/react/solid'
import CPost from '../../../../components/CPost'
const Profile = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [isShown, setIsShown] = useState(false)
  let name = user.user.name
  const { data, refetch } = useQuery('profile', () => getPath(name))
  useEffect(() => {
    user.user.img = data
    refetch()
  }, [data, name, refetch, user.user])

  return (
    <div>
      {/* exit */}
      <div className='border-b-2 border-gray-300 p-16px ' onClick={() => navigate('/')}>
        <ArrowLeftIcon className='w-48px text-green-600 rounded-md bg-gray-100 p-6px hover:bg-green-600 hover:text-white' />
      </div>
      {/* profile */}
      <img className=' h-200px w-full' src={user.user.img} alt='загружается...' />
      <div className='w-full flex mt-16px self-center border-b-2 border-gray-300 pb-16px'>
        <img className='ml-24px mr-16px h-100px rounded-xl w-100px' src={user.user.img} alt='загружается...' />
        <div className='flex w-full flex-col'>
          <div className='flex items-center align-center w-full  -mt-6px'>
            <div className='text-lg md:text-xl  font-bold'>{name}</div>
            <p className='ml-8px font-bold text-md text-gray-500'>@Псевдоимя</p>
            <div
              className='p-6px rounded-xl relative ml-auto mr-54px mt-12px border-2 '
              onMouseEnter={() => setIsShown(true)}
              onMouseLeave={() => setIsShown(false)}
            >
              <DotsVerticalIcon className='w-24px  text-green-600 ' />
              {isShown && (
                <div className='absolute w-140px -right-54px top-40px text-green-600  border-2  rounded-xl p-12px'>
                  <div className='flex flex-col  '>
                    <button>Редактировать профиль</button>
                    <button className='mt-6px'>Сменить аватарку</button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <p>Описание о себе и всё такое</p>

          {/* <div className='float-right w-300px border-3 border-green-600  rounded-xl p-16px border-dashed bg-white'>
            <FilesUploadComponent name={name} />
          </div> */}
        </div>
      </div>
      <div className='mt-16px'>
        <CPost getPost={getMyPosts} naming='myPosts' getObject={name} />
      </div>
    </div>
  )
}
export default Profile
