import { createSlice } from '@reduxjs/toolkit'
let initialState = {
    category: 'Общее',
    sort: '1',
    addPostStyle: false
}
const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        setCategory: (state: { category: string }, action: { payload: string }) => {
            state.category = action.payload;
        },
        setSort: (state: {sort: string | number}, action: { payload: string | number }) => {
            state.sort = action.payload;
        },
        setAddPostStyle: (state: { addPostStyle: boolean}, action: { payload: boolean }) => {
            state.addPostStyle = action.payload;
        }
    }
})

export const {setCategory, setSort, setAddPostStyle} = navSlice.actions
export default navSlice.reducer
