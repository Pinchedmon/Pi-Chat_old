import axios from 'axios'
import { IdeleteDialog } from '../../../types/deleteDialog.interface'

export const deleteDialog = (props: IdeleteDialog) => {
  axios.delete(`http://localhost:6060/message/dialog?names=${props.names}`).then((res) => {
    if (res.status === 200) {
      props.refetch()
    }
  })
}
