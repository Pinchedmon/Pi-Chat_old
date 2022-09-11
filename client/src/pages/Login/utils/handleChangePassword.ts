interface iForm {
  email: string
  password: string
  emailDirty: boolean
  passwordDirty: boolean
  emailError: string
  passwordError: string
  validForm: boolean
}
export const handleChangePassword = (
  e: React.ChangeEvent<HTMLInputElement>,
  setForm: (form: iForm) => void,
  form: iForm,
) => {
  setForm({ ...form, password: e.target.value })
  if (e.target.value.length < 3 || e.target.value.length > 12) {
    setForm({ ...form, passwordError: 'пароль должен быть от 3 до 12 символов' })
    if (!e.target.value) {
      setForm({ ...form, passwordError: 'Пароль не может быть пустым' })
    }
  } else {
    setForm({ ...form, passwordError: '' })
  }
}
