import { createSlice } from '@reduxjs/toolkit'
let initialState = {
  category: 'Общее',
  sort: 'Late',
  addPostStyle: false,
  addMessageStyle: false,
  messageStyle: false,
  editProfileStyle: false,
  isNavExpanded: false,
}

const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setCategory: (state: { category: string }, action: { payload: string }) => {
      state.category = action.payload
    },
    setSort: (state: { sort: string | number }, action: { payload: string | number }) => {
      state.sort = action.payload
    },
    setAddPostStyle: (state: { addPostStyle: boolean }, action: { payload: boolean }) => {
      state.addPostStyle = action.payload
    },
    setAddMessageStyle: (state: { addMessageStyle: boolean }, action: { payload: boolean }) => {
      state.addMessageStyle = action.payload
    },
    setMessageStyle: (state: { messageStyle: boolean }, action: { payload: boolean }) => {
      state.messageStyle = action.payload
    },
    setEditProfileStyle: (state: { editProfileStyle: boolean }, action: { payload: boolean }) => {
      state.editProfileStyle = action.payload
    },
    setIsNavExpanded: (state: { isNavExpanded: boolean }, action: { payload: boolean }) => {
      state.isNavExpanded = action.payload
    },
  },
})

export const {
  setCategory,
  setSort,
  setAddPostStyle,
  setAddMessageStyle,
  setMessageStyle,
  setEditProfileStyle,
  setIsNavExpanded,
} = navSlice.actions
export default navSlice.reducer
