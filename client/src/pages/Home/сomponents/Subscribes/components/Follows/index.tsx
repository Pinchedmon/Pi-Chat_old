import { XIcon } from '@heroicons/react/outline'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Ifollow, Ifollowers } from '../../types/follow.interface'
import { unFollow } from './utils/unFollow'

const Follows = (props: Ifollowers) => {
  const { data, refetch } = props
  console.log(data)
  const navigate = useNavigate()
  return (
    <div className='w-1/2 border-b-2 border-gray-300 border-r-2 '>
      {data !== undefined && (
        <div>
          <div className=' text-center p-16px text-xl border-b-2 border-gray-300 font-extrabold'>Подписки</div>
          {data.map((items: Ifollow, index: number) => (
            <div key={index} className='flex mt-12px justify-center'>
              <div className='w-180px flex items-center'>
                <img
                  alt=''
                  className={' rounded-xl mr-16px border-2 w-48px h-48px'}
                  onClick={() => navigate(`/../${items.object}`)}
                  src={items.img}
                />
                <p className='text-xl font-medium' onClick={() => navigate(`/../${items.object}`)}>
                  {items.object}
                </p>
              </div>
              <XIcon className='w-32px' onClick={() => unFollow(items.name, items.object, refetch)} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Follows
