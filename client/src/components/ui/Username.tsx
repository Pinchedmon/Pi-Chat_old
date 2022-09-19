import React, { useEffect, useState } from 'react'
import { getMyUsername } from '../../api/get'

function Username(props: { name: string }) {
  const [username, setUsername] = useState('')
  useEffect(() => {
    getMyUsername(props.name).then((res: any) => {
      if (res.status === 200) {
        setUsername(res.data.data[0].username)
      }
    })
  }, [])
  return <div>{username}</div>
}

export default Username
