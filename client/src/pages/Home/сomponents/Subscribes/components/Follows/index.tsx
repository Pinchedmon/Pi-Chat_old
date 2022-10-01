import React from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import redaxios from 'redaxios'
import Img from '../../../../../../components/ui/Img'

const Follows = (props: { name: string }) => {
  const getFollows = async (name: string) => {
    const response = await redaxios.get(`http://localhost:6060/follow/follows?name=${name}`)
    return response.data.data
  }
  const navigate = useNavigate()
  const { data, refetch } = useQuery('follows', () => getFollows(props.name))
  return (
    <div className='w-1/2 border-b-2 border-gray-300 border-r-2 '>
      {data !== undefined && (
        <div>
          <div className=' text-center p-16px text-xl border-b-2 border-gray-300 font-extrabold'>Подписки</div>
          {data.map((items: any) => (
            <div className='flex mt-12px justify-center'>
              <div className='w-180px flex items-center'>
                <Img
                  name={items.object}
                  className={' rounded-xl mr-16px border-2 w-48px h-48px'}
                  onClick={() => navigate(`/../${items.object}`)}
                />
                <p className='text-xl font-medium' onClick={() => navigate(`/../${items.object}`)}>
                  {items.object}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Follows
