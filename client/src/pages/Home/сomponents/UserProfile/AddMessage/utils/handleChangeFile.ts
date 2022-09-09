export const handleChangeFile = (e: React.SyntheticEvent<EventTarget>, setMessage: (message: any) => void) => {
  const target = e.target as HTMLInputElement
  setMessage((message: any) => ({ ...message, file: target.files[0] }))
}
