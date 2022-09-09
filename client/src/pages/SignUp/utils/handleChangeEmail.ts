export const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>, setForm: (form: any) => void) => {
  setForm((form: any) => ({ ...form, email: e.target.value }))
  const re =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  if (!re.test(String(e.target.value).toLowerCase())) {
    setForm((form: any) => ({ ...form, emailError: 'Некорректен email' }))
    if (!e.target.value) {
      setForm((form: any) => ({ ...form, emailError: 'Email не может быть пустым' }))
    }
  } else {
    setForm((form: any) => ({ ...form, emailError: '' }))
  }
}
