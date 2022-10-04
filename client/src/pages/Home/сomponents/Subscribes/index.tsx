import React, { useContext } from 'react'

import { UserContext } from '../../../../App'
import Followers from './components/Followers'
import Follows from './components/Follows'

function Subscribes(props: any) {
  const user = useContext(UserContext)
  return (
    <div className='flex w-full justify-around'>
      <Follows name={user.name} />
      <Followers name={user.name} />
    </div>
  )
}

export default Subscribes
