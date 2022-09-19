import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMyUsername } from '../../api/get'

function Username(props: { name: string }) {
  const [username, setUsername] = useState('')
  const navigate = useNavigate()
  useEffect(() => {
    getMyUsername(props.name).then((res: any) => {
      if (res.status === 200) {
        setUsername(res.data.data[0].username)
      }
    })
  }, [])
  return <div onClick={() => navigate(`/${username}`)}>{username}</div>
}

export default Username
