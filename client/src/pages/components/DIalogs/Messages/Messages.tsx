import React, { useEffect, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import { getMessagesInfo } from '../../../../api/get'
import Message from './Message/Message'
const Messages = (props: { names: string }) => {
  const bottomRef = useRef(null)
  const [selected, setSelected] = useState(0)
  const { data } = useQuery('message', () => getMessagesInfo(props.names))
  useEffect(() => {
    if (data !== undefined) {
      bottomRef.current?.scrollIntoView({ behavior: 'auto' })
    }
  }, [data])
  const checkSelect = (x: string) => {
    if (x === '+') {
      setSelected(selected + 1)
    }
    if (x === '-') {
      setSelected(selected - 1)
    }
  }
  return (
    <div className='mt-4px'>
      {data !== undefined &&
        data.map((item: any) => (
          <Message username={item.username} messageImg={item.messageImg} text={item.text} checkSelect={checkSelect} />
        ))}
      <div ref={bottomRef} />
      {selected > 0 && <div>Выделено {selected} </div>}
    </div>
  )
}
export default Messages
