import axios from 'axios'
export const deleteDialog = (props: { refetch: () => void; names: string }) => {
  axios.delete(`http://localhost:6060/message/dialog?names=${props.names}`).then((res) => {
    if (res.status === 200) {
      props.refetch()
    }
  })
}
