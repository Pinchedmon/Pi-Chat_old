import React from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import redaxios from 'redaxios'
import Img from '../../../../../../components/ui/Img'

const Followers = (props: { name: string }) => {
  const getFollowers = async (name: string) => {
    const response = await redaxios.get(`http://localhost:6060/follow/followers?object=${name}`)
    return response.data.data
  }
  const navigate = useNavigate()
  const { data, refetch } = useQuery('followers', () => getFollowers(props.name))
  return (
    <div className='w-1/2 h-screen'>
      {data !== undefined && (
        <div className='mb-12px h-full '>
          <div className=' w-full text-center p-16px text-xl border-b-2 border-gray-300 font-extrabold'>Подписчики</div>
          {data.map((items: any) => (
            <div className='flex  mt-12px justify-center'>
              <div className='w-180px flex items-center'>
                <Img
                  name={items.name}
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
