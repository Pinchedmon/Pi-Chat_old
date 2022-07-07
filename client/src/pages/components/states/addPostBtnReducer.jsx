import { createSlice } from "@reduxjs/toolkit";
let initialState = {
    category: 'Общее',
    course: '1',
    text: ''
}
const addPostBtnSlicer = createSlice({
    name: 'addPostBtn',
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.category = action.payload;
        },
        setText: (state, action) => {
            state.text = action.payload;
        },
        setCourse: (state, action) => {
            state.course = action.payload;
        }   
    }
})
export const {setCategory, setCourse, setText} = addPostBtnSlicer.actions
export default addPostBtnSlicer.reducer

 

