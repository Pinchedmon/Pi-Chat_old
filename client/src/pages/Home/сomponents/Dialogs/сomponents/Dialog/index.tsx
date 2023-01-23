import React, { useContext, useEffect, useState } from 'react'
import SendField from '../../../../../../components/ux/SendField'
import Messages from './components/Messages'
import { postMessage } from '../../../../../../api/post'
import { getMessages } from '../../../../../../api/get'
import { UserContext } from '../../../../../../App'
import { ArrowLeftIcon } from '@heroicons/react/solid'
import { setIsMenuShowed, setMessageStyle } from '../../../../../../state/navReducer'
import { resetOn } from '../../../../../../state/messageReducer'
import { IdialogProps } from '../../types/dialogProps.interface'
import { Imessage } from '../../types/message.interface'
import { useSelector } from 'react-redux'
import { Istore } from '../../../../../../types/store.interface'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const readMsgs = async (refetch: () => void, msgs: any) => {
  const fd = new FormData()
  fd.append('msg', JSON.stringify(msgs))
  await axios.put(`http://localhost:6060/message/read`, fd).then((res) => {
    if (res.status === 200) {
      refetch()
      return res
    }
  })
}
const Dialog = (props: IdialogProps) => {
  const { dispatch, visible, names, refetchDialogs } = props
  const navigate = useNavigate()
  const [msgs, setMsgs] = useState<Array<Imessage>>([])
  const defaultPageToken = 1
  const activeDialog = useSelector((state: Istore) => state.message.activeDialog)
  const [nextPage, setNextPage] = useState(defaultPageToken)
  const [isLoading, setIsLoading] = useState(false)
  const fetchData = (token: number, count: number) => {
    getMessages(
      props.names,
      names.replace(user.name, '').toString().trim(),
      token,
      Math.round(window.innerHeight / 35),
    ).then((data: any) => {
      if (data.items.length > 0) {
        setMsgs([...msgs, ...data.items])
      }
      setNextPage(data.page)
    })
  }
  useEffect(() => {
    let x = msgs.filter((item: Imessage) => {
      return item.read === 0 && item.name !== user.name
    })
    if (x.length > 0) {
      readMsgs(() => {
        let a = msgs
        for (let i = 0; i < a.length; i++) {
          a[i].read = 1
        }
        setMsgs(a)
        user.refetchUser()
      }, x)
    }
  }, [msgs.length])
  const handleFetchMore = () => {
    setIsLoading(true)
    fetchData(nextPage, defaultPageToken)
    setIsLoading(false)
  }
  const deleteMsg = (x: Array<String>) => {
    let a = msgs
    for (let i = 0; i < x.length; i++) {
      a = a.filter((msg: Imessage) => msg.ID !== Number(x[i]))
    }
    setMsgs(a)
  }
  const addMessage = (x: Imessage) => {
    setMsgs([x, ...msgs])
  }
  useEffect(() => {
    fetchData(nextPage, 20)
  }, [])
  const user = useContext(UserContext)
  return (
    <>
      <div className='dialog'>
        <ArrowLeftIcon
          onClick={() => {
            dispatch(setMessageStyle(!visible))
            dispatch(setIsMenuShowed(true))
            dispatch(resetOn())
            refetchDialogs()
          }}
          className='dialog-left-icon'
        />
        <div className='dialog-info'>
          <img
            onClick={() => navigate(`/${activeDialog.name}`)}
            alt=''
            className='dialog-info__img hover:cursor-pointer'
            src={activeDialog.avatar}
          />
          <span className='hover:cursor-pointer' onClick={() => navigate(`/${activeDialog.name}`)}>
            {activeDialog.name}
          </span>
        </div>
      </div>
      <Messages showMoreMsg={handleFetchMore} data={msgs} deleteMsg={deleteMsg} />
      <SendField
        postFuncProps={{
          firstName: user.name.trim(),
          secondName: names.replace(user.name, '').trim(),
          setMsgs: addMessage,
        }}
        postFunc={postMessage}
        object='message'
      />
    </>
  )
}
export default Dialog
