import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './loginReducer'
import messageReducer from './messageReducer'
import modalReducer from './modalReducer'

import navReducer from './navReducer'
export const store = configureStore({
  reducer: {
    message: messageReducer,
    nav: navReducer,
    login: loginReducer,
    modal: modalReducer,
  },
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
