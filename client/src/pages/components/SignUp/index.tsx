import React, { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'

export default function SignUpPage() {
  const { signUp, loading, error } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (email !== '' && name !== '' && password !== '') {
      signUp(email, name, password)
      event.preventDefault()
    } else {
      window.alert('Какое-поле не заполнено')
    }
  }
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign up</h1>

      <label>
        Name
        <input name='name' value={name} onChange={handleChangeName} />
      </label>

      <label>
        Email
        <input name='email' type='email' value={email} onChange={handleChangeEmail} />
      </label>

      <label>
        Password
        <input name='password' type='password' value={password} onChange={handleChangePassword} />
      </label>

      {/*
        While the network request is in progress,
        we disable the button. You can always add
        more stuff, like loading spinners and whatnot.
      */}
      <button>Submit</button>

      <Link to='/login'>Login</Link>
    </form>
  )
}
