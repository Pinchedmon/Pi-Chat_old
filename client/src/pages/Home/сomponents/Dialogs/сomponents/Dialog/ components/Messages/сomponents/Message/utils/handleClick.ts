interface click {
  selectedMsg: string
  addSelected: (text: string) => void
  removeSelected: (text: string) => void
  dispatch: (arg0: any) => void
  setSelectedMsg: (x: any) => void
  text: string
}

export const handleClick = (props: click) => {
  const { selectedMsg, addSelected, removeSelected, dispatch, setSelectedMsg, text } = props
  if (selectedMsg === '') {
    setSelectedMsg('bg-gray-100')
    dispatch(addSelected(text))
  } else {
    setSelectedMsg('')
    dispatch(removeSelected(text))
  }
}
