import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios"

const initialState = {
    isLoading: true,
    userList: []
}

export const getAllUsers = createAsyncThunk(
    "/user/getAllUsers",
    async() => {
        const response = await axios.get(
            "http://localhost:5000/api/user/getAllUsers"
        )
        return response.data;
    }
)

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllUsers.pending, (state) =>{
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
    }
})

export default UserSlice.reducer