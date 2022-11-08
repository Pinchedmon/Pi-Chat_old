import { FormEvent } from 'react'
import axios from 'axios'
import { IaddMessageSubmit } from '../../../types/addMessage.inteface'

export function addMessageSubmit(event: FormEvent<HTMLFormElement>, props: IaddMessageSubmit) {
  const { firstName, secondName, text, path, file } = props
  if (firstName == secondName) {
    window.alert('Вы не можете отправлять себе сообщения')
  } else {
    let data = new FormData()
    data.append('message', file)
    if (props.text !== '') {
      axios.post(
        `http://localhost:6060/message/post?name=${firstName}&secondName=${secondName}&text=${text}&userImg=${path}`,
        data,
      )
      event.preventDefault()
    } else {
      window.alert('Какое-то поле незаполнено!')
      event.preventDefault()
    }
  }
}
