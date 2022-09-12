import { createSlice } from '@reduxjs/toolkit'
interface iForm {
  email: string
  password: string
  emailDirty: boolean
  passwordDirty: boolean
  emailError: string
  passwordError: string
  validForm: boolean
}
let initialState = {
  form: {
    email: '',
    password: '',
    emailDirty: false,
    passwordDirty: false,
    emailError: 'Email не может быть пустым',
    passwordError: 'Пароль не может быть пустым',
    validForm: false,
  },
}
const navSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setForm: (state: { form: iForm }, action: { payload: iForm }) => {
      state.form = action.payload
    },
  },
})

export const { setForm } = navSlice.actions
export default navSlice.reducer
