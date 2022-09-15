import redaxios from 'redaxios'
export const deleteMessage = (
  refetch: () => void,
  dispatch: (arg0: any) => void,
  resetOn: () => void,
  statements: string[],
) => {
  redaxios.delete(`http://localhost:6060/message/messages?text=${statements.join(' ')}`).then((res) => {
    if (res.status === 200) {
      dispatch(resetOn())
      refetch()
    }
  })
}
