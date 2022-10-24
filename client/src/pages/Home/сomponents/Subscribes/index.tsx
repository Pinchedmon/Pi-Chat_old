import React, { useContext } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { UserContext } from '../../../../App'
import Followers from './components/Followers'
import Follows from './components/Follows'

function Subscribes() {
  const getSubscribes = async (name: string) => {
    const response = await axios.get(`http://localhost:6060/follow/mySubs?name=${name}`)
    return response.data
  }
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

      {/*  */}
    </div>
  )
}

export default Subscribes
