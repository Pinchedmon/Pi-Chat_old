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
export const handleChangeName = (
  e: React.ChangeEvent<HTMLInputElement>,
  setForm: (form: iForm) => void,
  form: iForm,
) => {
  if (e.target.value.length < 3 || e.target.value.length > 16) {
    setForm({ ...form, nameError: 'Имя должно быть от 3 до 16 символов', name: e.target.value })
    if (e.target.value === '') {
      setForm({ ...form, nameError: 'Имя не может быть пустым', name: e.target.value })
    }
  } else {
    setForm({ ...form, nameError: '', name: e.target.value })
  }
}
