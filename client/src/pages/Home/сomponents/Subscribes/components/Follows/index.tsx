import { XIcon } from '@heroicons/react/outline'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Ifollow, Ifollowers } from '../../types/follow.interface'
import { unFollow } from './utils/unFollow'

const Follows = (props: Ifollowers) => {
  const { data, refetch } = props
  const navigate = useNavigate()
  return (
    <>
      {data && (
        <div className='follows border-r-2'>
          <div className='follows-title'>Подписки</div>
          {data.map((items: Ifollow, index: number) => (
            <div key={index} className='follow'>
              <div className='follow-info'>
                <img
                  alt=''
                  className='follow-info__img'
                  onClick={() => navigate(`/../${items.object}`)}
                  src={items.img}
                />
                <p className='follow-info__p' onClick={() => navigate(`/../${items.object}`)}>
                  {items.object}
                </p>
              </div>
              <XIcon className='follow-close-icon' onClick={() => unFollow(items.name, items.object, refetch)} />
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default Follows
