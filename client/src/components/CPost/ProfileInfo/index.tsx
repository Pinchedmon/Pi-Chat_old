import React from 'react'
import { useNavigate } from 'react-router-dom'

function ProfileInfo(props: { name: string; username: string }) {
  const { name, username } = props
  const navigate = useNavigate()
  return (
    <div className='flex items-center align-center -mt-6px'>
      <button onClick={() => navigate(`/${name}`)} className='text-lg md:text-xl hover:underline font-bold'>
        {username}
      </button>
      <p className='ml-8px font-bold text-md text-gray-500'>@{name}</p>
      <p className='ml-8px font-bold text-md text-gray-500'>24ч</p>
    </div>
  )
}

export default ProfileInfo
