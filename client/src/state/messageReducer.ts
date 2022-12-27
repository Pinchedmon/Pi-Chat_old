import { createSlice } from '@reduxjs/toolkit'
interface iSelected {
  amount: number
  statements: any
  resetStatus: boolean
}
interface iActiveDialog {
  avatar: string
  name: string
}
let initialState = {
  selected: { amount: 0, statements: [] as any[], resetStatus: false },
  activeDialog: { avatar: '', name: '' },
}
const navSlice = createSlice({
  name: 'messages',
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
    setActiveDialog: (
      state: { activeDialog: iActiveDialog },
      action: { payload: { avatar: string; name: string } },
    ) => {
      state.activeDialog = action.payload
    },
  },
})

export const { addSelected, removeSelected, resetSelected, resetOn, setActiveDialog } = navSlice.actions
export default navSlice.reducer
