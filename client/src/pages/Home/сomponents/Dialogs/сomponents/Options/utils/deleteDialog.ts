import redaxios from 'redaxios'
export const deleteDialog = (props: { refetch: () => void; names: string }) => {
  redaxios.delete(`http://localhost:6060/message/dialog?names=${props.names}`).then((res) => {
    if (res.status === 200) {
      props.refetch()
    }
  })
}
