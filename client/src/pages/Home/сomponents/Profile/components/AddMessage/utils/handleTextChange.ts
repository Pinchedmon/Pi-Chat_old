interface iMessage {
  file: File
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
  if (!e.target.value) {
    setMessage({ ...message, textError: 'Имя не может быть пустым', text: e.target.value })
  } else {
    setMessage({ ...message, textError: '', text: e.target.value })
  }
}
