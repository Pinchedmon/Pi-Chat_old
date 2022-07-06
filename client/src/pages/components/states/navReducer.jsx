import { createSlice } from '@reduxjs/toolkit'
let initialState = {
    category: 'Общее',
    sort: '1'
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
        }
    }
})

export const {setCategory, setSort } = navSlice.actions
export default navSlice.reducer
