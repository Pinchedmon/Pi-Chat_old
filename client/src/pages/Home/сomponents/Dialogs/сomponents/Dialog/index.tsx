import React, { useContext, useState } from 'react'
import SendField from '../../../../../../components/ux/SendField'
import Messages from './components/Messages'
import { postMessage } from '../../../../../../api/post'
import { useQuery } from 'react-query'
import { getMessages } from '../../../../../../api/get'
import { UserContext } from '../../../../../../App'
import { ArrowLeftIcon } from '@heroicons/react/solid'
import { setMessageStyle } from '../../../../../../state/navReducer'
import { resetOn } from '../../../../../../state/messageReducer'
import { IdialogProps } from '../../types/dialogProps.interface'
import { Imessage } from '../../types/message.interface'

const Dialog = (props: IdialogProps) => {
  const { dispatch, visible, names } = props
  const [msgs, setMsgs] = useState<Array<Imessage>>([])
  let page = 1
  const { data, refetch } = useQuery('dialog', () =>
    getMessages(props.names, names.replace(user.name, '').toString().trim(), page).then((res: any) => {
      if (res.status === 200) {
        if (msgs.length > 0) {
          setMsgs([...msgs, ...res.data])
        } else {
          setMsgs(res.data)
        }

        return res
      }
    }),
  )
  const showMoreMsg = () => {
    page++
    refetch()
  }
  const user = useContext(UserContext)
  return (
    <>
      {data && (
        <>
          <div className='dialog'>
            <ArrowLeftIcon
              onClick={() => {
                dispatch(setMessageStyle(!visible))
                dispatch(resetOn())
              }}
              className='dialog-left-icon'
            />
            <div className='dialog-info'>
              <img alt='' className='dialog-info__img' onClick={null} src={data.pathImg} />
              {data.username}
            </div>
          </div>
          <Messages showMoreMsg={showMoreMsg} data={msgs} refetch={refetch} />

          <SendField
            postFuncProps={{
              firstName: user.name.trim(),
              secondName: names.replace(user.name, '').trim(),
              refetch: refetch,
            }}
            postFunc={postMessage}
            object='message'
          />
        </>
      )}
    </>
  )
}

export default Dialog
