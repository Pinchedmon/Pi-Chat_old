import { TrashIcon } from '@heroicons/react/outline'
import React, { useEffect, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import { getMessagesInfo } from '../../../../../../../../api/get'
import Message from './сomponents/Message'
import { checkSelect } from './utils/checkSelect'
import { deleteMessage } from './utils/deleteMessage'
interface iSelected {
  amount: number
  statements: string[]
  resetStatus: boolean
}
const Messages = (props: { names: string }) => {
  const bottomRef = useRef(null)
  const [selected, setSelected] = useState({ amount: 0, statements: [], resetStatus: false })
  const { data, refetch } = useQuery('message', () => getMessagesInfo(props.names))
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
            <div
              className='text-green-600 mr-16px'
              onClick={() => setSelected((selected: iSelected) => ({ ...selected, resetStatus: true }))}
            >
              Отменить
            </div>
            <div className='flex' onClick={() => deleteMessage(refetch, setSelected, selected)}>
              <TrashIcon className='mr-4px w-24px' />
              Удалить
            </div>
          </div>
        </div>
      )}

      <div className='z-0 pt-4px relative overflow-y-hidden h-full '>
        {data !== undefined &&
          data.map((item: any) => (
            <Message
              username={item.username}
              messageImg={item.messageImg}
              text={item.text}
              checkSelect={() => checkSelect}
              reset={selected.resetStatus}
            />
          ))}
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
export default Messages
