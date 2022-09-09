export const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>, setForm: (form: any) => void) => {
  setForm((form: any) => ({ ...form, name: e.target.value }))
  if (e.target.value.length < 3 || e.target.value.length > 16) {
    setForm((form: any) => ({ ...form, nameError: 'Имя должно быть от 3 до 16 символов' }))
    if (!e.target.value) {
      setForm((form: any) => ({ ...form, nameError: 'Имя не может быть пустым' }))
    }
  } else {
    setForm((form: any) => ({ ...form, nameError: '' }))
  }
}
