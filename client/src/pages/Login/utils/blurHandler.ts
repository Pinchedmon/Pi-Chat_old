import { Iform } from '../types/login.interface'

export const blurHandler = (e: React.FocusEvent<HTMLInputElement>, setForm: (form: Iform) => void, form: Iform) => {
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
