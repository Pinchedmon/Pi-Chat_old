import { FormEvent } from 'react'
import axios from 'axios'
interface IAddMessageSubmit {
  firstName: string
  secondName: string
  text: string
  path: string
  showMessage: () => void
  file: File
}
export function addMessageSubmit(event: FormEvent<HTMLFormElement>, props: IAddMessageSubmit) {
  const { firstName, secondName, text, path, showMessage, file } = props
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
      showMessage()
      event.preventDefault()
    } else {
      window.alert('Какое-то поле незаполнено!')
      event.preventDefault()
    }
  }
}
