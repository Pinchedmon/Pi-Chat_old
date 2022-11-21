import axios from 'axios'
import { IdeletePost } from '../../../../types/deletePost.interface'

export const deletePost = (props: IdeletePost) => {
  axios.delete(`http://localhost:6060/posts/feed?id=${props.id}`).then((res) => {
    if (res.status === 200) {
      props.refetch(props.id)
    }
  })
}
