import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from "../store/authSlice"

export const store = configureStore({
  reducer: {
    auth: AuthReducer
  },
})