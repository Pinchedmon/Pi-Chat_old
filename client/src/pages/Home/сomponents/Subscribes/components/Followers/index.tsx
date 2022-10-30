import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Ifollow, Ifollowers } from '../../types/follow.interface'

const Followers = (props: Ifollowers) => {
  const { data } = props
  const navigate = useNavigate()
  return (
    <div className='follows '>
      {data && (
        <>
          <div className=' follows-title'>Подписчики</div>
          {data.map((items: Ifollow, index: number) => (
            <div key={index} className='follow'>
              <div className='follow-info'>
                <img
                  alt=''
                  src={items.img}
                  className='follow-info__img'
                  onClick={() => navigate(`/../${items.name}`)}
                />
                <p className='follow-info__p' onClick={() => navigate(`/../${items.name}`)}>
                  {items.name}
                </p>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default Followers
