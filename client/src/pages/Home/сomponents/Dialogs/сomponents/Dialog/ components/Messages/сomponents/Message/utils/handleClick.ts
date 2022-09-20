interface click {
  selectedMsg: string
  addSelected: (text: number) => void
  removeSelected: (text: number) => void
  dispatch: (arg0: any) => void
  setSelectedMsg: (x: any) => void
  id: number
}

export const handleClick = (props: click) => {
  const { selectedMsg, addSelected, removeSelected, dispatch, setSelectedMsg, id } = props
  if (selectedMsg === '') {
    setSelectedMsg('bg-gray-100')
    dispatch(addSelected(id))
  } else {
    setSelectedMsg('')
    dispatch(removeSelected(id))
  }
}
