import React, { FormEvent, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
interface iForm {
  email: string
  password: string
  emailDirty: boolean
  passwordDirty: boolean
  emailError: string
  passwordError: string
  validForm: boolean
}
export default function Login() {
  const { login, error } = useAuth()
  const [form, setForm] = useState<iForm>({
    email: '',
    password: '',
    emailDirty: false,
    passwordDirty: false,
    emailError: 'Email не может быть пустым',
    passwordError: 'Пароль не может быть пустым',
    validForm: false,
  })
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (form.email !== '' && form.password !== '') {
      event.preventDefault()
      login(form.email, form.password)
    } else {
      window.alert('какое-то поле не заполнено')
    }
  }
  useEffect(() => {
    if (form.emailError || form.passwordError) {
      setForm((form: iForm) => ({ ...form, validForm: false }))
    } else {
      setForm((form: iForm) => ({ ...form, validForm: true }))
    }
  }, [form.emailError, form.passwordError])

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((form: iForm) => ({ ...form, email: e.currentTarget.value }))
    const re =
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if (!re.test(String(e.target.value).toLowerCase())) {
      setForm((form: iForm) => ({ ...form, emailError: 'Некорректен email' }))
      if (!e.target.value) {
        setForm((form: iForm) => ({ ...form, emailError: 'Email не может быть пустым' }))
      }
    } else {
      setForm((form: iForm) => ({ ...form, emailError: 'Некорректен email' }))
    }
  }
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((form: iForm) => ({ ...form, password: e.currentTarget.value }))
    if (e.target.value.length < 3 || e.target.value.length > 12) {
      setForm((form: iForm) => ({ ...form, passwordError: 'пароль должен быть от 3 до 12 символов' }))
      if (!e.target.value) {
        setForm((form: iForm) => ({ ...form, passwordError: 'Пароль не может быть пустым' }))
      }
    } else {
      setForm((form: iForm) => ({ ...form, passwordError: '' }))
    }
  }
  const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'email': {
        setForm((form: iForm) => ({ ...form, emailDirty: true }))
        break
      }
      case 'password': {
        setForm((form: iForm) => ({ ...form, emailDirty: true }))
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
        {form.emailDirty && form.emailError && <div className='text-red-600'>{form.emailError}</div>}
        <input
          className='w-220px ml-auto mr-auto rounded-xl font-bold p-3px mb-16px text-center border-3 border-green-600'
          name='email'
          placeholder='Email'
          value={form.email}
          onBlur={(e) => blurHandler(e)}
          onChange={handleChangeEmail}
        />
        {form.passwordDirty && form.passwordError && <div className='text-red-600'>{form.passwordError}</div>}
        <input
          className='w-220px ml-auto mr-auto rounded-xl font-bold p-3px mb-16px text-center border-3 border-green-600'
          name='password'
          placeholder='Пароль'
          type='password'
          value={form.password}
          onBlur={(e) => blurHandler(e)}
          onChange={handleChangePassword}
        />

        <button
          disabled={!form.validForm}
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
