import { createSlice } from '@reduxjs/toolkit'
interface iSelected {
  amount: number
  statements: string[]
  resetStatus: boolean
}
let initialState = {
  selected: { amount: 0, statements: [''], resetStatus: false },
}
const navSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    addSelected: (state: { selected: iSelected }, action: { payload: number }) => {
      state.selected.amount = state.selected.amount + 1
      state.selected.resetStatus = false
      state.selected.statements = [...state.selected.statements, action.payload.toString()]
    },
    removeSelected: (state: { selected: iSelected }, action: { payload: number }) => {
      state.selected.amount = state.selected.amount - 1
      state.selected.resetStatus = false
      state.selected.statements = state.selected.statements.filter((item: string) => item !== action.payload.toString())
    },
    resetSelected: (state: { selected: iSelected }) => {
      state.selected.amount = 0
      state.selected.statements = []
      state.selected.resetStatus = true
    },
    resetOn: (state: { selected: iSelected }) => {
      state.selected.resetStatus = true
      state.selected.amount = 0
      state.selected.statements = []
    },
  },
})

export const { addSelected, removeSelected, resetSelected, resetOn } = navSlice.actions
export default navSlice.reducer
