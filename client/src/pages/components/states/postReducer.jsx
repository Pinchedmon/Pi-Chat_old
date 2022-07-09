import { createSlice} from "@reduxjs/toolkit";
import axios from 'axios'

let initialState = {
    posts: [{}]
}
const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
        }
    }
})
export const getPosts = ( dispatch, sort, category) => {
       axios.get(`http://localhost:6060/feed?sort=${sort}&category=${category}`).then(response =>{
        dispatch(setPosts(response.data.data))
       })
        
       
}
export const {setPosts} = postsSlice.actions
export default postsSlice.reducer
