import axios from 'axios'
export const handleDelete = (id: number, postId: number, refetch: (id: number) => void, commentId?: number) => {
  axios.delete(`http://localhost:6060/comment?postId=${postId}&id=${id}&commentId=${commentId}`).then((response) => {
    if (response.status === 200) {
      refetch(id)
    }
  })
}
