import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from "../store/authSlice"
import PostReducer from "../store/postSlice"

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    post: PostReducer,
  },
})