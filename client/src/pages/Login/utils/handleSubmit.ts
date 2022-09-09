import { FormEvent } from 'react'

export function handleSubmit(
  event: FormEvent<HTMLFormElement>,
  email: string,
  password: string,
  logIn: (email: string, password: string) => void,
) {
  if (email !== '' && password !== '') {
    event.preventDefault()
    logIn(email, password)
  } else {
    window.alert('какое-то поле не заполнено')
  }
}
