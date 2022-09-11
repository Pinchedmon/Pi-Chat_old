import redaxios from 'redaxios'
interface iSelected {
  amount: number
  statements: string[]
  resetStatus: boolean
}
export const deleteMessage = (refetch: () => void, setSelected: (selected: iSelected) => void, selected: iSelected) => {
  redaxios.delete(`http://localhost:6060/message/messages?text=${selected.statements}`).then((res) => {
    if (res.status === 200) {
      setSelected({ ...selected, resetStatus: true })
      refetch()
    }
  })
}
