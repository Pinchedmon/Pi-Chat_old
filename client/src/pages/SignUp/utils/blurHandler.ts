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
export const blurHandler = (e: React.FocusEvent<HTMLInputElement>, setForm: (form: iForm) => void, form: iForm) => {
  switch (e.target.name) {
    case 'name': {
      setForm({ ...form, nameDirty: true })
      break
    }
    case 'email': {
      setForm({ ...form, emailDirty: true })
      break
    }
    case 'password': {
      setForm({ ...form, passwordDirty: true })
      break
    }
  }
}
