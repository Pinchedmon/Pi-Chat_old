import redaxios from 'redaxios'
interface iSelected {
  amount: number
  statements: string[]
  resetStatus: boolean
}
export const deleteMessage = (refetch: () => void, setSelected: (selected: any) => void, statements: string[]) => {
  redaxios.delete(`http://localhost:6060/message/messages?text=${statements}`).then((res) => {
    if (res.status === 200) {
      setSelected((selected: iSelected) => ({ ...selected, resetStatus: true }))
      refetch()
    }
  })
}
