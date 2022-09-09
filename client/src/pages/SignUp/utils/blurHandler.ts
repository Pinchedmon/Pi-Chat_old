export const blurHandler = (e: React.FocusEvent<HTMLInputElement>, setForm: (form: any) => void) => {
  switch (e.target.name) {
    case 'name': {
      setForm((form: any) => ({ ...form, nameDirty: true }))
      break
    }
    case 'email': {
      setForm((form: any) => ({ ...form, emailDirty: true }))
      break
    }
    case 'password': {
      setForm((form: any) => ({ ...form, passwordDirty: true }))
      break
    }
  }
}
