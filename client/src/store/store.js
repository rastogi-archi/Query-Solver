import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from "./authSlice";
import PostReducer from "./postSlice";
import UserReducer from "./userSlice";
import MessageReducer from "./messageSlice";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    post: PostReducer,
    user: UserReducer,
    message: MessageReducer
  },
});
