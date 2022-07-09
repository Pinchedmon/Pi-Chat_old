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
        setCategory: (state, action) => {
            state.category = action.payload;
        },
        setSort: (state, action) => {
            state.sort = action.payload;
        },
        setAddPostStyle: (state, action) => {
            state.addPostStyle = action.payload;
        }
    }
})

export const {setCategory, setSort, setAddPostStyle} = navSlice.actions
export default navSlice.reducer
