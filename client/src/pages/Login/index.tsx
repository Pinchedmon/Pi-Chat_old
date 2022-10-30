import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { Iform } from './types/login.interface'
import { blurHandler } from './utils/blurHandler'
import { handleChangeEmail } from './utils/handleChangeEmail'
import { handleChangePassword } from './utils/handleChangePassword'
import { handleSubmit } from './utils/handleSubmit'

export default function Login() {
  const { logIn, error } = useAuth()
  const [form, setForm] = useState<Iform>({
    email: '',
    password: '',
    emailDirty: false,
    passwordDirty: false,
    emailError: 'Email не может быть пустым',
    passwordError: 'Пароль не может быть пустым',
    validForm: false,
  })
  // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (form.emailError || form.passwordError) {
      setForm({ ...form, validForm: false })
    } else {
      setForm({ ...form, validForm: true })
    }
  }, [form.emailError, form.passwordError])
  return (
    <div className='login'>
      <div className='login-title'>
        {error !== '' ? (
          <div className='login-title-error'>{error}</div>
        ) : (
          <h1 className='login-title__h1'>/ π - Чат /</h1>
        )}
      </div>
      <form onSubmit={(e) => handleSubmit(e, form.email, form.password, logIn)} className='login__form'>
        <h1 className='login-form__h1'>ВХОД</h1>
        {form.emailDirty && form.emailError && <div className='login-form-error'>{form.emailError}</div>}
        <input
          className='login-form__input'
          name='email'
          placeholder='Email'
          type='email'
          value={form.email}
          onBlur={(e) => blurHandler(e, setForm, form)}
          onChange={(e) => handleChangeEmail(e, setForm, form)}
        />
        {form.passwordDirty && form.passwordError && <div className='login-form-error'>{form.passwordError}</div>}
        <input
          className='login-form__input'
          name='password'
          placeholder='Пароль'
          type='password'
          value={form.password}
          onBlur={(e) => blurHandler(e, setForm, form)}
          onChange={(e) => handleChangePassword(e, setForm, form)}
        />

        <button disabled={!form.validForm} className='login-form__button'>
          Вход
        </button>

        <Link className='login-link' to='/signup'>
          Регистрация
        </Link>
      </form>
    </div>
  )
}
