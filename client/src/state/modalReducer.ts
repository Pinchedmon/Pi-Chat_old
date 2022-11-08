import { createSlice } from '@reduxjs/toolkit'
let initialState = {
  isOpen: false,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setIsOpen: (state: { isOpen: boolean }, action: { payload: boolean }) => {
      state.isOpen = action.payload
    },
  },
})

export const { setIsOpen } = modalSlice.actions
export default modalSlice.reducer
