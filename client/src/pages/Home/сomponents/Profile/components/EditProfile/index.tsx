import { ArrowLeftIcon } from '@heroicons/react/solid'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setEditProfileStyle } from '../../../../../../state/navReducer'
import EditBackground from './components/EditBackground'
import EditInfo from './components/EditInfo'
import EditName from './components/EditName'
import EditAvatar from './components/FilesUploadComponent'

function EditProfile(props: any) {
  const dispatch = useDispatch()
  return (
    <div className='absolute w-full top-0px backdrop-blur-md h-screen'>
      <div className='mt-100px'>
        <div className='flex flex-col justify-center items-center'>
          <form className=' text-center flex flex-col bg-white p-16px w-90% border-1 rounded-3xl border-2   shadow-2xl'>
            <div className='flex h-54px items-center text-green-600 rounded-2xl '>
              <ArrowLeftIcon
                onClick={() => dispatch(setEditProfileStyle(false))}
                className='w-48px  rounded-md bg-gray-100 p-6px  hover:text-red-700'
              />
              <h1 className='absolute left-1/2 -translate-x-1/2 text-2xl  rounded-xl p-10px font-bold  '>
                Настройка профиля
              </h1>
            </div>
            <div className='flex'>
              <EditBackground refetch={props.refetch} />
              <EditAvatar refetch={props.refetch} />
              <div className='flex flex-col justify-around'>
                <EditName refetch={props.refetch} />
                <EditInfo refetch={props.refetch} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
