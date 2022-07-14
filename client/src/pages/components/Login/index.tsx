import React, { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'

export default function Login() {
  const { login, error } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
      {error !== '' && (
        <div className='absolute left-1/2 mt-16 lg:mt-36 transform -translate-x-1/2 translate-y-1/2   rounded-md w-72 text-center text-red-600 p-1 border border-red-600'>
          {error}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className='flex text-center h-screen flex-col items-center self-center justify-center'
      >
        <h1 className='text-2xl rounded-md w-60 font-bold text-green-600 p-2 border-2 border-green-600'>/ π - Чат /</h1>

        <h1 className='text-xl mt-4 font-bold text-green-600'>ВХОД</h1>
        <input
          className='w-60 rounded-md font-bold p-2 mt-4 text-green-600 text-center border-2 border-green-600'
          name='email'
          placeholder='Email'
          value={email}
          onChange={handleChangeEmail}
        />

        <input
          className='w-60 rounded-md p-2 font-bold mt-2 text-lgh-20 text-green-600 text-center border-2 border-green-600'
          name='password'
          placeholder='Пароль'
          type='password'
          value={password}
          onChange={handleChangePassword}
        />

        <button className='w-36 rounded-md font-bold text-green-600 p-1 mt-6 text-lgh-20 text-center border-2 border-green-600'>
          Вход
        </button>

        <Link className='text-sm text-green-600 underline mt-2' to='/signup'>
          Регистрация
        </Link>
      </form>
    </>
  )
}
