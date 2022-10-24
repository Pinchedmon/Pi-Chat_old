import { Imessage } from '../../../types/addMessage.inteface'

export const handleTextChange = (
  e: React.ChangeEvent<HTMLTextAreaElement>,
  setMessage: (message: Imessage) => void,
  message: Imessage,
) => {
  if (!e.target.value) {
    setMessage({ ...message, textError: 'Имя не может быть пустым', text: e.target.value })
  } else {
    setMessage({ ...message, textError: '', text: e.target.value })
  }
}
