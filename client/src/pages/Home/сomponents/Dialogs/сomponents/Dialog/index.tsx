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

const Dialog = (props: IdialogProps) => {
  const { dispatch, visible, names } = props
  const [msgs, setMsgs] = useState<Array<Imessage>>([])
  const defaultPageToken = 1
  const [nextPage, setNextPage] = useState(defaultPageToken)
  const [isLoading, setIsLoading] = useState(false)
  const [userInfo, setUserInfo] = useState({ username: '', img: '' })
  const fetchData = (token: number, count: number) => {
    getMessages(
      props.names,
      names.replace(user.name, '').toString().trim(),
      token,
      Math.round(window.innerHeight / 35),
    ).then((data: any) => {
      setMsgs([...msgs, ...data.items])
      setNextPage(data.page)
      setUserInfo({ username: data.username, img: data.pathImg })
    })
  }

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
      {msgs.length > 0 && (
        <>
          <div className='dialog'>
            <ArrowLeftIcon
              onClick={() => {
                dispatch(setMessageStyle(!visible))
                dispatch(setIsMenuShowed(true))
                dispatch(resetOn())
              }}
              className='dialog-left-icon'
            />
            <div className='dialog-info'>
              <img alt='' className='dialog-info__img' onClick={null} src={userInfo.img} />
              {userInfo.username}
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
      )}
    </>
  )
}

export default Dialog
