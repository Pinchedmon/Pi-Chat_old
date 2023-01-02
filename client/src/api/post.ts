import axios from 'axios'
import { Imessage } from '../pages/Home/сomponents/Dialogs/types/message.interface'

interface apiParamComments {
  commentId: number
  id: number
  name: string
  text: string
  refetch: () => void
}
interface apiParamMessages {
  firstName: string
  secondName: string
  text: string
  refetch: () => void
  setMsgs: (x: Imessage) => void
}
export async function postComment(props: apiParamComments, formData: any): Promise<any> {
  await axios
    .post(
      `http://localhost:6060/comment?id=${props.id}&name=${props.name}&text=${props.text}&commentId=${
        props.commentId
      }&date=${new Date().toUTCString()}`,
      formData,
    )
    .then((res) => {
      if (res.status === 200) {
        props.refetch()
        return res.data.data
      }
    })
}

export async function postMessage(props: apiParamMessages, messageImg: any): Promise<any> {
  await axios
    .post(
      `http://localhost:6060/message/post?name=${props.firstName}&secondName=${props.secondName}&text=${
        props.text
      }&time=${new Date().toUTCString()}`,
      messageImg,
    )
    .then((res) => {
      if (res.status === 200) {
        props.setMsgs(res.data.message)
        return res
      }
    })
}
