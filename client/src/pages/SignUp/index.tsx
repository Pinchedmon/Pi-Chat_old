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
        onSubmit={(e) => handleSubmit(e, form.name, form.email, form.password, signUp)}
        className='w-300px md:w-346px drop-shadow-xl flex rounded-3xl bg-white text-center flex-col self-center'
      >
        <h1 className='text-3xl font-bold mt-32px mb-24px drop-shadow-md'>РЕГИСТРАЦИЯ</h1>
        {form.nameDirty && form.nameError && <div className='text-red-600 text-sm'>{form.nameError}</div>}
        <input
          className='w-220px ml-auto mr-auto rounded-xl font-bold p-3px mb-16px text-center border-3 border-green-600'
          name='name'
          placeholder='Имя'
          value={form.name}
          onBlur={(e) => blurHandler(e, setForm, form)}
          onChange={(e) => handleChangeName(e, setForm, form)}
        />
        {form.emailDirty && form.emailError && <div className='text-red-600 text-sm'>{form.emailError}</div>}
        <input
          className='w-220px ml-auto mr-auto rounded-xl font-bold p-3px mb-16px text-center border-3 border-green-600'
          name='email'
          placeholder='Email'
          type='email'
          value={form.email}
          onBlur={(e) => blurHandler(e, setForm, form)}
          onChange={(e) => handleChangeEmail(e, setForm, form)}
        />
        {form.passwordDirty && form.passwordError && <div className='text-red-600 text-sm'>{form.passwordError}</div>}
        <input
          className='w-220px rounded-xl ml-auto mr-auto font-bold p-3px mb-16px text-center border-3 border-green-600'
          name='password'
          placeholder='Пароль'
          type='password'
          value={form.password}
          onBlur={(e) => blurHandler(e, setForm, form)}
          onChange={(e) => handleChangePassword(e, setForm, form)}
        />

        <button
          disabled={!form.validForm}
          className='w-200px rounded-xl ml-auto mr-auto font-bold p-3px mb-32px text-center border-3 border-green-600'
        >
          Зарегистрироваться
        </button>

        <Link className='text-sm text-green-600 underline mb-8px ' to='/login'>
          Уже есть аккаунт?
        </Link>
      </form>
    </div>
  )
}
