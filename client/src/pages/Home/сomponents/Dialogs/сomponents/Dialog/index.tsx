import React, { useContext } from 'react'
import SendField from '../../../../../../components/ux/SendField'
import Messages from './ components/Messages'
import { postMessage } from '../../../../../../api/post'
import { useQuery } from 'react-query'
import { getMessagesInfo } from '../../../../../../api/get'
import { UserContext } from '../../../../../../App'
import { ArrowLeftIcon } from '@heroicons/react/solid'
import { setMessageStyle } from '../../../../../../state/navReducer'
import { resetOn } from '../../../../../../state/messageReducer'

function Dialog(props: { names: string; dispatch: (arg0: any) => void; visible: boolean }) {
  const { dispatch, visible, names } = props
  const { data, refetch } = useQuery('dialog', () =>
    getMessagesInfo(props.names, names.replace(user.name, '').toString().trim()).then((res: any) => {
      if (res.status === 200) {
        console.log(res)
        return res
      }
    }),
  )
  const user = useContext(UserContext)
  return (
    <>
      {data !== undefined && (
        <>
          {' '}
          <div className='w-full border-b-2  border-green-600 p-10px '>
            <ArrowLeftIcon
              onClick={() => {
                dispatch(setMessageStyle(!visible))
                dispatch(resetOn())
              }}
              className='w-48px text-green-600 rounded-md bg-gray-100 p-6px hover:bg-green-600 hover:text-white'
            />
            <div className='absolute  items-center flex left-1/2 -translate-x-1/2 text-2xl rounded-xl top-10px font-bold'>
              <img alt='' className={'w-50px h-50px mr-16px rounded-xl'} onClick={null} src={data.pathImg} />
              {data.username}
            </div>
          </div>
          <div className='overflow-y-scroll h-full'>
            <Messages data={data.data} refetch={refetch} />
          </div>
          <div className=''>
            <SendField
              postFuncProps={{
                firstName: user.name.trim(),
                secondName: names.replace(user.name, '').trim(),
                refetch: refetch,
              }}
              postFunc={postMessage}
              object='message'
            />
          </div>
        </>
      )}
    </>
  )
}

export default Dialog
