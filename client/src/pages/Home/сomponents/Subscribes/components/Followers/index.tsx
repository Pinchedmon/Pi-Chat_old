import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Ifollow, Ifollowers } from '../../types/follow.interface'

const Followers = (props: Ifollowers) => {
  const { data } = props
  const navigate = useNavigate()
  return (
    <div className='w-1/2 h-screen'>
      {data !== undefined && (
        <div className='mb-12px h-full '>
          <div className=' w-full text-center p-16px text-xl border-b-2 border-gray-300 font-extrabold'>Подписчики</div>
          {data.map((items: Ifollow, index: number) => (
            <div key={index} className='flex mt-12px justify-center'>
              <div className='w-180px flex items-center'>
                <img
                  alt=''
                  src={items.img}
                  className={'rounded-xl mr-16px border-2 w-48px h-48px'}
                  onClick={() => navigate(`/../${items.name}`)}
                />
                <p className='text-xl font-medium' onClick={() => navigate(`/../${items.name}`)}>
                  {items.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Followers
