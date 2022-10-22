import axios from 'axios'
export const deletePost = (props: { refetch: () => void; id: number }) => {
  axios.delete(`http://localhost:6060/posts/feed?id=${props.id}`).then((res) => {
    if (res.status === 200) {
      props.refetch()
    }
  })
}
