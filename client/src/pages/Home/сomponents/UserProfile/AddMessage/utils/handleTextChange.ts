interface iMessage {
  file: FileList
  preview: string
  validForm: boolean
  text: string
  textError: string
}
export const handleTextChange = (
  e: React.ChangeEvent<HTMLTextAreaElement>,
  setMessage: (message: iMessage) => void,
  message: iMessage,
) => {
  setMessage({ ...message, text: e.target.value })
  if (!e.target.value) {
    setMessage({ ...message, textError: 'Имя не может быть пустым' })
  } else {
    setMessage({ ...message, textError: '' })
  }
}
