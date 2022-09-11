interface iForm {
  email: string
  password: string
  emailDirty: boolean
  passwordDirty: boolean
  emailError: string
  passwordError: string
  validForm: boolean
}
export const blurHandler = (e: React.FocusEvent<HTMLInputElement>, setForm: (form: iForm) => void, form: iForm) => {
  switch (e.target.name) {
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
