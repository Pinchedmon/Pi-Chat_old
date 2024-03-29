import React from 'react'
import { formatLeft } from '../../../../../../../utils/dates'
import { IprofileInfo } from '../../../types/post.interface'
export const ProfileInfo = (props: IprofileInfo) => {
  const { username, name, date, onLink } = props
  return (
    <div className='post__profile-info'>
      <div onClick={onLink} className='post__profile-username'>
        {username}
      </div>
      <p onClick={onLink} className='post__profile-name'>
        @{name}
      </p>
      <p className='post__profile-date'>{formatLeft(date)}</p>
    </div>
  )
}

export default ProfileInfo
