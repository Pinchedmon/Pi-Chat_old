import redaxios from 'redaxios'
export const deletePost = (props: { refetch: () => void; id: number }) => {
  redaxios.delete(`http://localhost:6060/posts/feed?id=${props.id}`).then((res) => {
    if (res.status === 200) {
      props.refetch()
    }
  })
}
