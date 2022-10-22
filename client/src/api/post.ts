import axios from 'axios'

interface apiParamComments {
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
}
// Post comment
export async function postComment(props: apiParamComments, formData: any): Promise<any> {
  await axios
    .post(`http://localhost:6060/comment?id=${props.id}&name=${props.name}&text=${props.text}`, formData)
    .then((res) => {
      if (res.status === 200) {
        props.refetch()
        return res.data.data
      }
    })
}
// Post message
export async function postMessage(props: apiParamMessages, messageImg: any): Promise<any> {
  await axios
    .post(
      `http://localhost:6060/message/post?name=${props.firstName}&secondName=${props.secondName}&text=${props.text}`,
      messageImg,
    )
    .then((res) => {
      if (res.status === 200) {
        props.refetch()
        return res
      }
    })
}
