interface click {
  selectedMsg: string
  checkSelect: (x: any, y: any) => any
  setSelectedMsg: (x: any) => void
  text: string
}

export const handleClick = (props: click) => {
  const { selectedMsg, checkSelect, setSelectedMsg, text } = props
  if (selectedMsg === '') {
    setSelectedMsg('bg-gray-100')
    checkSelect('+', text)
  } else {
    setSelectedMsg('')
    checkSelect('-', text)
  }
}
