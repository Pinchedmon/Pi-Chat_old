import axios from 'axios'
export const deleteMessage = (
  refetch: () => void,
  dispatch: (arg0: any) => void,
  resetOn: () => void,
  statements: string[],
) => {
  axios.delete(`http://localhost:6060/message/messages?id=${statements.join(' ')}`).then((res) => {
    if (res.status === 200) {
      dispatch(resetOn())
      refetch()
    }
  })
}
