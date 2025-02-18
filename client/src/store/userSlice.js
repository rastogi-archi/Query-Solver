import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios"

const initialState = {
    user: null,
    isLoading: true,
    userList: []
}

export const getAllUsers = createAsyncThunk(
    "/user/getAllUsers",
    async () => {
        const response = await axios.get(
            "http://localhost:5000/api/user/getAllUsers"
        )
        return response.data;
    }
)

export const deleteUser = createAsyncThunk(
    "/user/delete",
    async (id) => {
        const response = await axios.delete(
            `http://localhost:5000/api/user/delete/${id}`
        )
        return id;
    }
)

export const getUserProfile = createAsyncThunk(
    "/user/profile",
    async (id) => {
        const response = await axios.get(
            `http://localhost:5000/api/user/profile/${id}`
        )
        return id;
    }
)

export const editUserProfile = createAsyncThunk(
    "/user/editProfile",
    async (id) => {
        const response = await axios.put(
            `http://localhost:5000/api/user/editProfile/${id}`
        )
        return id;
    }
)

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
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
    }
})

export default UserSlice.reducer