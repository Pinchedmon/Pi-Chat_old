import axios from 'axios'
import { IdeleteDialog } from '../../../types/deleteDialog.interface'

export const deleteDialog = async (props: IdeleteDialog) => {
  await axios.delete(`http://localhost:6060/message/dialog?names=${props.names}`).then((res) => {
    if (res.data.status === 200) {
      props.refetch(props.names)
    }
  })
}
