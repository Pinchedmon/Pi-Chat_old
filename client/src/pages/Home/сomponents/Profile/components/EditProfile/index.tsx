import { ArrowLeftIcon } from '@heroicons/react/solid'
import React from 'react'
import EditBackground from './components/EditBackground'
import EditInfo from './components/EditInfo'
import EditName from './components/EditName'
import EditAvatar from './components/FilesUploadComponent'

const EditProfile = (props: { refetch: () => void; setIsOpen: () => void }) => {
  const { refetch, setIsOpen } = props
  return (
    <>
      <div className='flex flex-col justify-center items-center'>
        <form className=' text-center flex flex-col dark:bg-black bg-white p-16px w-90% border-1 rounded-3xl border-2   shadow-2xl'>
          <div className='flex h-54px items-center text-green-600 rounded-2xl '>
            <ArrowLeftIcon
              onClick={() => setIsOpen()}
              className='w-48px  rounded-md bg-gray-100 dark:bg-black p-6px  hover:text-red-700'
            />
            <h1 className='absolute left-1/2 dark:text-white -translate-x-1/2 text-2xl  rounded-xl p-10px font-bold  '>
              Настройка профиля
            </h1>
          </div>
          <div className='flex'>
            <EditBackground refetch={refetch} />
            <EditAvatar refetch={refetch} />
            <div className='flex flex-col justify-around'>
              <EditName refetch={refetch} />
              <EditInfo refetch={refetch} />
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default EditProfile
