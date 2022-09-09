import React from 'react'
import SendField from '../../../../../../components/ux/SendField'
import useAuth from '../../../../../../hooks/useAuth'
import Messages from './ components/Messages'
import { postMessage } from '../../../../../../api/post'
import { useQuery } from 'react-query'
import { getMessagesInfo } from '../../../../../../api/get'

function Dialog(props: { names: string }) {
  const { refetch } = useQuery('message', () => getMessagesInfo(names))
  const { names } = props
  const { user } = useAuth()
  return (
    <>
      <div className='overflow-y-scroll h-full'>
        <Messages names={names} />
      </div>
      <div className=''>
        <SendField
          postFuncProps={{
            firstName: user.name.trim(),
            secondName: names.replace(user.name, '').trim(),
            refetch: refetch,
          }}
          postFunc={postMessage}
        />
      </div>
    </>
  )
}

export default Dialog
