import { FormEvent } from 'react'
import { IsignUpProps } from '../../../hooks/types/signUpProps.interface'

export function handleSubmit(
  event: FormEvent<HTMLFormElement>,
  name: string,
  email: string,
  password: string,
  signUp: (props: IsignUpProps) => void,
) {
  if (email !== '' && name !== '' && password !== '') {
    signUp({ email, name, password })
    event.preventDefault()
  } else {
    window.alert('Какое-поле не заполнено')
  }
}
