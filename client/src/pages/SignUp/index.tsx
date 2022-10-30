import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { Iform } from './types/signup.interface'
import { blurHandler } from './utils/blurHandler'
import { handleChangeEmail } from './utils/handleChangeEmail'
import { handleChangeName } from './utils/handleChangeName'
import { handleChangePassword } from './utils/handleChangePassword'
import { handleSubmit } from './utils/handleSubmit'

export default function SignUpPage() {
  const { signUp, error } = useAuth()
  const [form, setForm] = useState<Iform>({
    name: '',
    email: '',
    password: '',
    nameDirty: false,
    emailDirty: false,
    passwordDirty: false,
    nameError: 'Имя не может быть пустым',
    emailError: 'Email не может быть пустым',
    passwordError: 'Пароль не может быть пустым',
    validForm: false,
  })

  useEffect(() => {
    if (form.nameError || form.emailError || form.passwordError) {
      setForm({ ...form, validForm: false })
    } else {
      setForm({ ...form, validForm: true })
    }
  }, [form.nameError, form.emailError, form.passwordError])
  return (
    <div className='signup'>
      <div className='signup-title'>
        {error !== '' ? (
          <div className='signup-title-error'>{error}</div>
        ) : (
          <h1 className='signup-title__h1'>/ π - Чат /</h1>
        )}
      </div>
      <form onSubmit={(e) => handleSubmit(e, form.name, form.email, form.password, signUp)} className='signup__form'>
        <h1 className='signup__form-title'>РЕГИСТРАЦИЯ</h1>
        {form.nameDirty && form.nameError && <div className='signup__form-error'>{form.nameError}</div>}
        <input
          className='signup__form__input'
          name='name'
          placeholder='Имя'
          value={form.name}
          onBlur={(e) => blurHandler(e, setForm, form)}
          onChange={(e) => handleChangeName(e, setForm, form)}
        />
        {form.emailDirty && form.emailError && <div className='signup__form-error'>{form.emailError}</div>}
        <input
          className='signup__form__input'
          name='email'
          placeholder='Email'
          type='email'
          value={form.email}
          onBlur={(e) => blurHandler(e, setForm, form)}
          onChange={(e) => handleChangeEmail(e, setForm, form)}
        />
        {form.passwordDirty && form.passwordError && <div className='signup__form-error'>{form.passwordError}</div>}
        <input
          className='signup__form__input'
          name='password'
          placeholder='Пароль'
          type='password'
          value={form.password}
          onBlur={(e) => blurHandler(e, setForm, form)}
          onChange={(e) => handleChangePassword(e, setForm, form)}
        />

        <button disabled={!form.validForm} className='signup__form__button'>
          Зарегистрироваться
        </button>

        <Link className='signup-link' to='/login'>
          Уже есть аккаунт?
        </Link>
      </form>
    </div>
  )
}
