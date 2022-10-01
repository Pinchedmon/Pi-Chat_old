import React, { useContext } from 'react'

import { UserContext } from '../../../../App'
import Followers from './components/Followers'
import Follows from './components/Follows'

function Subscribes(props: any) {
  const user = useContext(UserContext)

  // const getFollowers = (name: string) => {
  //   redaxios.get(`http://localhost:6060/follow/followers?object=${user.name.toString().trim()}`).then((res) => {
  //     setFollowers(res.data.data)
  //   })
  // }

  // const [follows, setFollows] = useState<any>([{ name: '', object: '' }])
  // const [followers, setFollowers] = useState<any>([{ name: '', object: '' }])

  // useEffect(() => {
  //   getFollowers(user.name)
  // }, [])

  return (
    <div className='flex w-full justify-around'>
      <Follows name={user.name} />
      <Followers name={user.name} />
    </div>
  )
}

export default Subscribes
