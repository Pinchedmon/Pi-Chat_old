import React, { FormEvent, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
interface iForm {
  name: string
  email: string
  password: string
  nameDirty: boolean
  emailDirty: boolean
  passwordDirty: boolean
  nameError: string
  emailError: string
  passwordError: string
  validForm: boolean
}
export default function SignUpPage() {
  const { signUp, error } = useAuth()
  const [form, setForm] = useState<iForm>({
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
      setForm((form: iForm) => ({ ...form, validForm: false }))
    } else {
      setForm((form: iForm) => ({ ...form, validForm: true }))
    }
  }, [form.nameError, form.emailError, form.passwordError])
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (form.email !== '' && form.name !== '' && form.password !== '') {
      signUp(form.email, form.name, form.password)
      event.preventDefault()
    } else {
      window.alert('Какое-поле не заполнено')
    }
  }
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((form: iForm) => ({ ...form, name: e.target.value }))
    if (e.target.value.length < 3 || e.target.value.length > 16) {
      setForm((form: iForm) => ({ ...form, nameError: 'Имя должно быть от 3 до 16 символов' }))
      if (!e.target.value) {
        setForm((form: iForm) => ({ ...form, nameError: 'Имя не может быть пустым' }))
      }
    } else {
      setForm((form: iForm) => ({ ...form, nameError: '' }))
    }
  }
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((form: iForm) => ({ ...form, email: e.target.value }))
    const re =
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if (!re.test(String(e.target.value).toLowerCase())) {
      setForm((form: iForm) => ({ ...form, emailError: 'Некорректен email' }))
      if (!e.target.value) {
        setForm((form: iForm) => ({ ...form, emailError: 'Email не может быть пустым' }))
      }
    } else {
      setForm((form: iForm) => ({ ...form, emailError: '' }))
    }
  }
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((form: iForm) => ({ ...form, password: e.target.value }))
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
      case 'name': {
        setForm((form: iForm) => ({ ...form, nameDirty: true }))
        break
      }
      case 'email': {
        setForm((form: iForm) => ({ ...form, emailDirty: true }))
        break
      }
      case 'password': {
        setForm((form: iForm) => ({ ...form, passwordDirty: true }))
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
        <h1 className='text-3xl font-bold mt-32px mb-24px drop-shadow-md'>РЕГИСТРАЦИЯ</h1>
        {form.nameDirty && form.nameError && <div className='text-red-600 text-sm'>{form.nameError}</div>}
        <input
          className='w-220px ml-auto mr-auto rounded-xl font-bold p-3px mb-16px text-center border-3 border-green-600'
          name='name'
          placeholder='Имя'
          value={form.name}
          onBlur={(e) => blurHandler(e)}
          onChange={handleChangeName}
        />
        {form.emailDirty && form.emailError && <div className='text-red-600 text-sm'>{form.emailError}</div>}
        <input
          className='w-220px ml-auto mr-auto rounded-xl font-bold p-3px mb-16px text-center border-3 border-green-600'
          name='email'
          placeholder='Email'
          type='email'
          value={form.email}
          onBlur={(e) => blurHandler(e)}
          onChange={handleChangeEmail}
        />
        {form.passwordDirty && form.passwordError && <div className='text-red-600 text-sm'>{form.passwordError}</div>}
        <input
          className='w-220px rounded-xl ml-auto mr-auto font-bold p-3px mb-16px text-center border-3 border-green-600'
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
          Зарегистрироваться
        </button>

        <Link className='text-sm text-green-600 underline mb-8px ' to='/login'>
          Уже есть аккаунт?
        </Link>
      </form>
    </div>
  )
}
