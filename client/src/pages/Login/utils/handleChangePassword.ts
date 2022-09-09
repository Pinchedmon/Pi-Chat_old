export const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>, setForm: (form: any) => void) => {
  setForm((form: any) => ({ ...form, password: e.target.value }))
  if (e.target.value.length < 3 || e.target.value.length > 12) {
    setForm((form: any) => ({ ...form, passwordError: 'пароль должен быть от 3 до 12 символов' }))
    if (!e.target.value) {
      setForm((form: any) => ({ ...form, passwordError: 'Пароль не может быть пустым' }))
    }
  } else {
    setForm((form: any) => ({ ...form, passwordError: '' }))
  }
}
