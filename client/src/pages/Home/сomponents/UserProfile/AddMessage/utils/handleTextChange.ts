export const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>, setMessage: (message: any) => void) => {
  setMessage((message: any) => ({ ...message, text: e.target.value }))
  if (!e.target.value) {
    setMessage((message: any) => ({ ...message, textError: 'Имя не может быть пустым' }))
  } else {
    setMessage((message: any) => ({ ...message, textError: '' }))
  }
}
