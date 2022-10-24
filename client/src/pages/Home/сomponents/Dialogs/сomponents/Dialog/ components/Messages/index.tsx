import { TrashIcon } from '@heroicons/react/outline'
import React, { useEffect, useRef } from 'react'
import Message from './сomponents/Message'
import { deleteMessage } from './utils/deleteMessage'
import { useDispatch, useSelector } from 'react-redux'
import { resetOn } from '../../../../../../../../state/messageReducer'
import { Imessage } from '../../../../types/message.interface'
interface iSelected {
  amount: number
  statements: string[]
  resetStatus: boolean
}
interface iState {
  message: { selected: iSelected }
}
const Messages = (props: { data: any; refetch: any }) => {
  const { data, refetch } = props
  const selected = useSelector((state: iState) => state.message.selected)
  const dispatch = useDispatch()
  const bottomRef = useRef(null)
  // const { refetch } = useQuery('dialog')
  useEffect(() => {
    if (data !== undefined) {
      bottomRef.current?.scrollIntoView({ behavior: 'auto' })
    }
  }, [data])
  return (
    <div className=''>
      {selected.amount > 0 && (
        <div className='z-10 sticky top-0px  w-full p-10px bg-gray-100 font-bold  text-green-600 '>
          Выделено {selected.amount}
          <div className='flex float-right text-red-600 cursor-pointer'>
            <div className='text-green-600 mr-16px' onClick={() => dispatch(resetOn())}>
              Отменить
            </div>
            <div className='flex' onClick={() => deleteMessage(refetch, dispatch, resetOn, selected.statements)}>
              <TrashIcon className='mr-4px w-24px' />
              Удалить
            </div>
          </div>
        </div>
      )}

      <div className='z-0 relative overflow-y-hidden h-full '>
        {data !== undefined &&
          data.map((item: Imessage) => (
            <Message
              name={item.name}
              messageImg={item.messageImg}
              ID={item.ID}
              text={item.text}
              dispatch={dispatch}
              reset={selected.resetStatus}
              time={item.time}
            />
          ))}
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
export default Messages
