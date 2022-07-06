import { createSlice } from '@reduxjs/toolkit'
let initialState = {
    posts: [{}]
}
const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        refetch: (state, action) => {
            state.posts = action.payload;
        }
    }
})
export const {refetch} = postsSlice.actions
export default postsSlice.reducer
