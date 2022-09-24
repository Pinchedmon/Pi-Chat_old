import React from 'react'
import Username from '../../../../../../../../../components/ui/Username'

function ProfileInfo(props: { name: string }) {
  const { name } = props
  return (
    <div className='flex items-center mb-2px align-center -mt-6px'>
      <div className=' text-2xl  font-bold'>
        <Username name={name} />
      </div>
      <p className='ml-8px font-bold text-md text-gray-500'>@{name}</p>
      <p className='ml-8px font-bold text-md text-gray-500'>24ч</p>
    </div>
  )
}

export default ProfileInfo
