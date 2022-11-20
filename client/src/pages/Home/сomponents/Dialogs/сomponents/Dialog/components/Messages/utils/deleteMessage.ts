import axios from 'axios'
export const deleteMessage = (
  deleteMsg: (x: string) => void,
  dispatch: (arg0: any) => void,
  resetOn: () => void,
  statements: string[],
) => {
  axios.delete(`http://localhost:6060/message/messages?id=${statements.join(' ')}`).then((res) => {
    if (res.status === 200) {
      dispatch(resetOn())
      for (let i = 0; i < statements.length; i++) {
        deleteMsg(statements[i])
      }
    }
  })
}
