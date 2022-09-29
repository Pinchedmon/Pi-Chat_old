import React, { useContext, useEffect, useState } from 'react'
import redaxios from 'redaxios'
import { UserContext } from '../../../../App'

function Follows(props: any) {
  const user = useContext(UserContext)
  //   const getFollows = (name: string) => {

  //   }
  const [follows, setFollows] = useState<any>([{ name: '', object: '' }])

  useEffect(() => {
    redaxios.get(`http://localhost:6060/follow/follows?name=${user.name.toString().trim()}`)
  }, [])
  return (
    <div>
      {follows.map((items: any) => {
        ;<>
          dsadasdasdsa <p>{items.name}</p>
          <p>{items.object}</p>
        </>
      })}
    </div>
  )
}

export default Follows
