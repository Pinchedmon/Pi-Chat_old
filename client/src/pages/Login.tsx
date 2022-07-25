import React, { FormEvent, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export default function Login() {
  const { login, error } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailDirty, setEmailDirty] = useState(false)
  const [passwordDirty, setPasswordDirty] = useState(false)
  const [emailError, setEmailError] = useState('Email не может быть пустым')
  const [passwordError, setPasswordError] = useState('Пароль не может быть пустым')
  const [validForm, setValidForm] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (email !== '' && password !== '') {
      event.preventDefault()
      login(email, password)
    } else {
      window.alert('какое-то поле не заполнено')
    }
  }
  useEffect(() => {
    if (emailError || passwordError) {
      setValidForm(false)
    } else {
      setValidForm(true)
    }
  }, [emailError, passwordError])

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    const re =
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('некорректен email')
      if (!e.target.value) {
        setEmailError('Email не может быть пустым')
      }
    } else {
      setEmailError('')
    }
  }
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    if (e.target.value.length < 3 || e.target.value.length > 12) {
      setPasswordError('Пароль должен быть от 3 до 12 символов')
      if (!e.target.value) {
        setPasswordError('Пароль не может быть пустым')
      }
    } else {
      setPasswordError('')
    }
  }
  const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'email': {
        setEmailDirty(true)
        break
      }
      case 'password': {
        setPasswordDirty(true)
        break
      }
    }
  }
  return (
    <div className='bg-green-600 w-full h-screen flex flex-col justify-center align-center'>
      <div className='ml-auto drop-shadow-md  mb-16px mr-auto w-260px h-100px rounded-3xl bg-white flex justify-center items-center'>
        {error !== '' ? (
          <div className='text-center font-bold text-red-600'>{error}</div>
        ) : (
          <h1 className='text-3xl text-center rounded-2xl shadow-lg pt-12px pb-12px pl-32px pr-32px  font-bold text-black border-3 border-green-600'>
            / π - Чат /
          </h1>
        )}
      </div>
      <form
        onSubmit={handleSubmit}
        className='w-300px md:w-346px drop-shadow-xl flex rounded-3xl bg-white text-center flex-col self-center'
      >
        <h1 className='text-3xl font-bold mt-32px mb-24px drop-shadow-md'>ВХОД</h1>
        {emailDirty && emailError && <div className='text-red-600'>{emailError}</div>}
        <input
          className='w-220px ml-auto mr-auto rounded-xl font-bold p-3px mb-16px text-center border-3 border-green-600'
          name='email'
          placeholder='Email'
          value={email}
          onBlur={(e) => blurHandler(e)}
          onChange={handleChangeEmail}
        />
        {passwordDirty && passwordError && <div className='text-red-600'>{passwordError}</div>}
        <input
          className='w-220px ml-auto mr-auto rounded-xl font-bold p-3px mb-16px text-center border-3 border-green-600'
          name='password'
          placeholder='Пароль'
          type='password'
          value={password}
          onBlur={(e) => blurHandler(e)}
          onChange={handleChangePassword}
        />

        <button
          disabled={!validForm}
          className='w-200px rounded-xl ml-auto mr-auto font-bold p-3px mb-32px text-center border-3 border-green-600'
        >
          Вход
        </button>

        <Link className='text-sm text-green-600 underline  mb-8px' to='/signup'>
          Регистрация
        </Link>
      </form>
    </div>
  )
}
