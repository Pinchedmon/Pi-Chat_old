import React from 'react'
import { IprofileInfo } from '../../../types/post.interface'
export const ProfileInfo = (props: IprofileInfo) => {
  const { username, name, date, time } = props
  return (
    <div className='post__profile-info'>
      <div className='post__profile-username'>{username}</div>
      <p className='post__profile-name'>@{name}</p>
      <p className='post__profile-date'>{date === new Date().toLocaleDateString() ? time : date}</p>
    </div>
  )
}

export default ProfileInfo
