interface iForm {
  email: string
  password: string
  emailDirty: boolean
  passwordDirty: boolean
  emailError: string
  passwordError: string
  validForm: boolean
}
export const handleChangeEmail = async (
  e: React.ChangeEvent<HTMLInputElement>,
  setForm: (form: iForm) => void,
  form: iForm,
) => {
  const re =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

  if (!re.test(String(e.target.value).toLowerCase())) {
    if (e.target.value === '') {
      setForm({ ...form, emailError: 'Email не может быть пустым', email: e.target.value })
    }
    setForm({ ...form, emailError: 'Некорректен email', email: e.target.value })
  } else {
    setForm({ ...form, emailError: '', email: e.target.value })
  }
}
