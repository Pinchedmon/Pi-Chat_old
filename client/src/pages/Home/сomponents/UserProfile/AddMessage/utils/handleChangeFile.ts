interface IaddMessage {
  file: FileList
  preview: string
  validForm: boolean
  text: string
  textError: string
}
export const handleChangeFile = (
  e: React.SyntheticEvent<EventTarget>,
  setMessage: (message: IaddMessage) => void,
  message: IaddMessage,
) => {
  const target = e.target as HTMLInputElement
  setMessage({ ...message, file: target.files })
}
