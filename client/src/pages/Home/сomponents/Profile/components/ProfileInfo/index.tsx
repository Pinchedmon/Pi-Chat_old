import { UserAddIcon } from '@heroicons/react/solid'
import React from 'react'
import { follow } from '../../utils/follow'
import { unFollow } from '../../utils/unfollow'
import Options from '../Options'

function ProfileInfo(props: { profile: any; refetch: () => void; name: string; followed: boolean }) {
  const { profile, refetch, name, followed } = props
  return (
    <div className='w-full flex mt-16px self-center border-b-2 border-gray-300 pb-16px'>
      <img className=' rounded-xl w-100px h-100px ml-16px mr-16px' src={profile.pathImg} alt='загружается...' />
      <div className='flex w-full flex-col'>
        {/* naming */}
        <div className='flex items-center align-center w-full  -mt-6px'>
          <div className='font-bold text-2xl'>{profile.username}</div>
          <p className='ml-8px font-bold text-md text-gray-500'>@{profile.name}</p>
        </div>
        {/* info */}
        <div>
          {profile.info}
          {profile.name !== name && (
            <button
              className='border-2  p-6px flex mb-6px items-center font-bold'
              onClick={() =>
                followed === true ? unFollow(name, profile.name, refetch) : follow(name, profile.name, refetch)
              }
            >
              <UserAddIcon className='w-24px mr-8px  ' />
              {followed === true ? (
                <p className='ml-2px text-md '>Отписаться</p>
              ) : (
                <p className='ml-2px text-md'>Подписаться</p>
              )}
            </button>
          )}
        </div>
      </div>
      <Options id={0} userName={name} profileName={profile.name} />
    </div>
  )
}

export default ProfileInfo
