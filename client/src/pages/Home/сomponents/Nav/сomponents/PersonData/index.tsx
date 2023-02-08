import { LogoutIcon } from '@heroicons/react/solid'
import React from 'react'
import useAuth from '../../../../../../hooks/useAuth'
import { IpersonDataProps } from '../../types/personData'

const PersonData = (props: IpersonDataProps) => {
  const { logout } = useAuth()
  const { name, username, pathImg } = props

  return (
    <div className='h-full flex flex-col-reverse mb-16px'>
      <div className='person-data'>
        <img className='person-data__img' src={pathImg} alt='adadsd' />
        <div className='person-data__info'>
          <div className='person-data__info__username'>{username}</div>
          <div className='person-data__info__name'>@{name}</div>
        </div>
        <div onClick={logout} className='person-data__button'>
          <LogoutIcon />
        </div>
      </div>
    </div>
  )
}

export default PersonData
