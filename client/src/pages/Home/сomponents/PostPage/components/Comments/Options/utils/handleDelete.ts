import axios from 'axios'
export const handleDelete = (id: number, postId: number, refetch: () => void) => {
  axios.delete(`http://localhost:6060/comment?postId=${postId}&id=${id}`).then((response) => {
    if (response.status === 200) {
      refetch()
    }
  })
}
