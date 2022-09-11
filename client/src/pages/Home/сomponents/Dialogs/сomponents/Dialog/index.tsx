import React, { useContext } from 'react'
import SendField from '../../../../../../components/ux/SendField'
import Messages from './ components/Messages'
import { postMessage } from '../../../../../../api/post'
import { useQuery } from 'react-query'
import { getMessagesInfo } from '../../../../../../api/get'
import { UserContext } from '../../../../../../App'

function Dialog(props: { names: string }) {
  const { refetch } = useQuery('message', () => getMessagesInfo(names))
  const { names } = props
  const user = useContext(UserContext)
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
