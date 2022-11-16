import { TrashIcon } from '@heroicons/react/outline'
import React from 'react'
import Message from './сomponents/Message'
import { deleteMessage } from './utils/deleteMessage'
import { useDispatch, useSelector } from 'react-redux'
import { resetOn } from '../../../../../../../../state/messageReducer'
import { Imessage } from '../../../../types/message.interface'
import { Istore } from '../../../../../../../../types/store.interface'
import InfiniteScroll from 'react-infinite-scroll-component'

const Messages = (props: { data: Array<Imessage>; refetch: () => void; showMoreMsg: () => void }) => {
  const { data, refetch, showMoreMsg } = props
  const selected = useSelector((state: Istore) => state.message.selected)
  const dispatch = useDispatch()

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
      <div
        id='scrollableDiv'
        style={{
          height: 300,
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column-reverse',
        }}
      >
        <InfiniteScroll
          next={showMoreMsg}
          hasMore={true}
          inverse={true}
          loader={''}
          dataLength={data.length}
          scrollableTarget='scrollableDiv'
        >
          {data.map((item: Imessage, index: number) => (
            <div key={index}>
              <Message
                name={item.name}
                messageImg={item.messageImg}
                ID={item.ID}
                text={item.text}
                dispatch={dispatch}
                reset={selected.resetStatus}
                time={item.time}
              />
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  )
}
export default Messages
