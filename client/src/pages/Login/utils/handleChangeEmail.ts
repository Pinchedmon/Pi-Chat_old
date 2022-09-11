interface iForm {
  email: string
  password: string
  emailDirty: boolean
  passwordDirty: boolean
  emailError: string
  passwordError: string
  validForm: boolean
}
export const handleChangeEmail = (
  e: React.ChangeEvent<HTMLInputElement>,
  setForm: (form: iForm) => void,
  form: iForm,
) => {
  setForm({ ...form, email: e.target.value })
  const re =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  if (!re.test(String(e.target.value).toLowerCase())) {
    setForm({ ...form, emailError: 'Некорректен email' })
    if (!e.target.value) {
      setForm({ ...form, emailError: 'Email не может быть пустым' })
    }
  } else {
    setForm({ ...form, emailError: '' })
  }
}
