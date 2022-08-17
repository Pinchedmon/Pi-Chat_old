import React from 'react'
import CMessages from '../../../components/CMessages'
import useAuth from '../../../hooks/useAuth'

function Messages() {
  const { user } = useAuth()
  return (
    <div>
      <CMessages name={user.user.name} />
    </div>
  )
}

export default Messages
