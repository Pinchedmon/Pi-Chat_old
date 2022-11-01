import moment from 'moment'
import React from 'react'
import { IprofileInfo } from '../../../types/post.interface'
export const ProfileInfo = (props: IprofileInfo) => {
  const { username, name, date } = props
  console.log(date)
  return (
    <div className='post__profile-info'>
      <div className='post__profile-username'>{username}</div>
      <p className='post__profile-name'>@{name}</p>
      <p className='post__profile-date'>{moment(date).startOf('hour').fromNow()}</p>
    </div>
  )
}

export default ProfileInfo
