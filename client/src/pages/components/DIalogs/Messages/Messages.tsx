import React, { useEffect, useRef } from 'react'
import { useQuery } from 'react-query'
import { getMessagesInfo } from '../../../../api/get'
import Message from './Message/Message'
const Messages = (props: { names: string }) => {
  const bottomRef = useRef(null)
  const { data } = useQuery('message', () => getMessagesInfo(props.names))
  useEffect(() => {
    if (data !== undefined) {
      bottomRef.current?.scrollIntoView({ behavior: 'auto' })
    }
  }, [data])
  return (
    <div className='mt-4px'>
      {data !== undefined &&
        data.map((item: any) => <Message username={item.username} messageImg={item.messageImg} text={item.text} />)}
      <div ref={bottomRef} />
    </div>
  )
}
export default Messages
