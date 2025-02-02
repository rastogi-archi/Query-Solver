import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from "../store/authSlice"
import PostReducer from "../store/postSlice"
import UserReducer from "../store/userSlice"

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    post: PostReducer,
    user: UserReducer
  },
})