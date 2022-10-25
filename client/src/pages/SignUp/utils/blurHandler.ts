import { Iform } from '../types/signup.interface'

export const blurHandler = (e: React.FocusEvent<HTMLInputElement>, setForm: (form: Iform) => void, form: Iform) => {
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
