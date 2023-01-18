import { UserAddIcon } from '@heroicons/react/solid'
import React, { useContext } from 'react'
import { SocketContext } from '../../../..'
import { IprofileInfo } from '../../types/profile.interface'
import { follow } from '../../utils/follow'
import { unFollow } from '../../utils/unfollow'
import Options from '../Options'

function ProfileInfo(props: IprofileInfo) {
  const { profile, refetch, name, followed } = props
  const socket = useContext(SocketContext)
  const handleFollow = (type: number) => {
    follow(name, profile.name, refetch)
    socket.emit('sendNotification', {
      senderName: name,
      receiverName: profile.name,
      type,
    })
  }
  return (
    <div className='profile'>
      <img className='profile-avatar' src={profile.pathImg} alt='загружается...' />
      <div className='profile-info'>
        <div className='profile-info-naming'>
          <div className='profile-info-naming-username'>{profile.username}</div>
          <p className='profile-info-naming-name'>@{profile.name}</p>
        </div>
        <div>
          {profile.info}
          {profile.name !== name && (
            <button
              className='profile-follow'
              onClick={() => (followed ? unFollow(name, profile.name, refetch) : handleFollow(3))}
            >
              <UserAddIcon className='profile-follow-icon' />
              <p className='profile-follow_p'>{followed ? 'Отписаться' : 'Подписаться'}</p>
            </button>
          )}
        </div>
      </div>
      <Options userName={name} profileName={profile.name} refetch={refetch} />
    </div>
  )
}

export default ProfileInfo
