import { Iform } from '../types/signup.interface'

export const handleChangePassword = (
  e: React.ChangeEvent<HTMLInputElement>,
  setForm: (form: Iform) => void,
  form: Iform,
) => {
  if (e.target.value.length < 3 || e.target.value.length > 12) {
    setForm({ ...form, passwordError: 'пароль должен быть от 3 до 12 символов', password: e.target.value })
    if (e.target.value === '') {
      setForm({ ...form, passwordError: 'Пароль не может быть пустым', password: e.target.value })
    }
  } else {
    setForm({ ...form, passwordError: '', password: e.target.value })
  }
}
