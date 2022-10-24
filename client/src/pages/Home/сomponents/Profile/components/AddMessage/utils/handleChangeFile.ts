import { Imessage } from '../../../types/addMessage.inteface'

export const handleChangeFile = (
  e: React.SyntheticEvent<EventTarget>,
  setMessage: (message: Imessage) => void,
  message: Imessage,
) => {
  const target = e.target as HTMLInputElement
  setMessage({ ...message, file: target.files[0] })
}
