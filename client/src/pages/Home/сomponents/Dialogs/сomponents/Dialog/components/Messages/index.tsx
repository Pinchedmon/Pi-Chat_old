import { TrashIcon } from '@heroicons/react/outline'
import React, { useEffect, useRef } from 'react'
import Message from './сomponents/Message'
import { deleteMessage } from './utils/deleteMessage'
import { useDispatch, useSelector } from 'react-redux'
import { resetOn } from '../../../../../../../../state/messageReducer'
import { Imessage } from '../../../../types/message.interface'
import { Istore } from '../../../../../../../../types/store.interface'

const Messages = (props: { data: any; refetch: any }) => {
  const { data, refetch } = props
  const selected = useSelector((state: Istore) => state.message.selected)
  const dispatch = useDispatch()
  const bottomRef = useRef(null)
  useEffect(() => {
    if (data !== undefined) {
      bottomRef.current?.scrollIntoView({ behavior: 'auto' })
    }
  }, [data])
  return (
    <div className='messages'>
      {selected.amount > 0 && (
        <div className='messages-selection'>
          Выделено {selected.amount}
          <div className='messages-selection-buttons'>
            <div className='messages-selection-cancel' onClick={() => dispatch(resetOn())}>
              Отменить
            </div>
            <div
              className='messages-selection-delete'
              onClick={() => deleteMessage(refetch, dispatch, resetOn, selected.statements)}
            >
              <TrashIcon className='messages-selection-delete-icon' />
              Удалить
            </div>
          </div>
        </div>
      )}

      <div className='messages-info'>
        {data &&
          data.map((item: Imessage, index: number) => (
            <Message
              index={index}
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
