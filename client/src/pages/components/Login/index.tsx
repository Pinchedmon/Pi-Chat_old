import React, { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'

export default function Login() {
  const { login, error } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  console.log(error)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (email !== '' && password !== '') {
      event.preventDefault()
      login(email, password)
    } else {
      window.alert('какое-то поле не заполнено')
    }
  }

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>

        <label>
          email
          <input name='email' value={email} onChange={handleChangeEmail} />
        </label>

        <label>
          Password
          <input name='password' type='password' value={password} onChange={handleChangePassword} />
        </label>

        <button>Submit</button>
        <div>{message + error}</div>
        <Link to='/signup'>Sign Up</Link>
      </form>
    </>
  )
}
