import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios"

const initialState = {
    user: null,
    isLoading: true,
    userList: []
}

const API_BASE_URL = "https://query-solver-backend.onrender.com";

export const getAllUsers = createAsyncThunk(
    "/user/getAllUsers",
    async () => {
        const response = await axios.get(
            `${API_BASE_URL}/api/user/getAllUsers`
        )
        return response.data;
    }
)
export const checkAuth = createAsyncThunk(
    "/user/checkAuth",
    async () => {
        const response = await axios.get(`${API_BASE_URL}/api/auth/checkAuth`, {
            withCredentials: true
        });
        return response.data.user;
    }
);

export const deleteUser = createAsyncThunk(
    "/user/delete",
    async (id) => {
        const response = await axios.delete(
            `${API_BASE_URL}/api/user/delete/${id}`
        )
        return id;
    }
)

export const getUserProfile = createAsyncThunk(
    "/user/profile",
    async (id) => {
        const response = await axios.get(
            `${API_BASE_URL}/api/user/profile/${id}`
        )
        return id;
    }
)

export const editUserProfile = createAsyncThunk(
    "/user/editProfile",
    async (id) => {
        const response = await axios.put(
            `${API_BASE_URL}/api/user/editProfile/${id}`
        )
        return id;
    }
)

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userList = action.payload.data;
            })
            .addCase(getAllUsers.rejected, (state) => {
                state.isLoading = false;
                state.userList = []
            })
            .addCase(deleteUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userList = state.userList.filter((user) => user._id !== action.payload);
            })
            .addCase(deleteUser.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(getUserProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.isLoading = false;
            })
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
            })
    }
})

export const { setUser } = UserSlice.actions;
export default UserSlice.reducer