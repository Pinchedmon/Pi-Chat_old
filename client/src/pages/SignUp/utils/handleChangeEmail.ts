import { Iform } from '../types/signup.interface'

export const handleChangeEmail = (
  e: React.ChangeEvent<HTMLInputElement>,
  setForm: (form: Iform) => void,
  form: Iform,
) => {
  const re =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

  if (!re.test(String(e.target.value).toLowerCase())) {
    setForm({ ...form, emailError: 'Некорректен email', email: e.target.value })
    if (e.target.value === '') {
      setForm({ ...form, emailError: 'Email не может быть пустым', email: e.target.value })
    }
  } else {
    setForm({ ...form, emailError: '', email: e.target.value })
  }
}
