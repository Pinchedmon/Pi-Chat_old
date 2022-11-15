import React, { useContext } from 'react'
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

const Dialog = (props: IdialogProps) => {
  const { dispatch, visible, names } = props
  const { data, refetch } = useQuery('dialog', () =>
    getMessages(props.names, names.replace(user.name, '').toString().trim()).then((res: any) => {
      if (res.status === 200) {
        return res
      }
    }),
  )
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
          <Messages data={data.data} refetch={refetch} />
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
