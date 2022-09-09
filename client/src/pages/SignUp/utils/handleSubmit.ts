import { FormEvent } from 'react'

export function handleSubmit(
  event: FormEvent<HTMLFormElement>,
  name: string,
  email: string,
  password: string,
  signUp: (email: string, name: string, password: string) => void,
) {
  if (email !== '' && name !== '' && password !== '') {
    signUp(email, name, password)
    event.preventDefault()
  } else {
    window.alert('Какое-поле не заполнено')
  }
}
