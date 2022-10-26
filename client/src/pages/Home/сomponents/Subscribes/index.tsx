import React, { useContext } from 'react'
import { useQuery } from 'react-query'
import { UserContext } from '../../../../App'
import Followers from './components/Followers'
import Follows from './components/Follows'
import { getSubscribes } from '../../../../api/get'

const Subscribes = () => {
  const user = useContext(UserContext)
  const { data, refetch } = useQuery('subscribes', () =>
    getSubscribes(user.name).then((res) => {
      if (res.status === 200) {
        return res.data
      }
    }),
  )

  return (
    <div className='flex w-full justify-around'>
      {data !== undefined && (
        <>
          <Follows name={user.name} data={data.follows} refetch={refetch} />
          <Followers name={user.name} data={data.followers} />
        </>
      )}
    </div>
  )
}

export default Subscribes
