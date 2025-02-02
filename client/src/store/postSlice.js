import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios"

const initialState = {
    isLoading: true,
    postList: []
}

export const createPost = createAsyncThunk(
    '/post/create-post',
    async(FormData) => {
        const response = await axios.post(
            "http://localhost:5000/api/post/create-post",
            FormData,
            {
                withCredentials: true
            }
        )
        console.log(response.data);
        return response.data;
    }
)

export const fetchAllPost = createAsyncThunk(
    "/post/get",
    async() => {
        const response = await axios.get(
            "http://localhost:5000/api/post/get"
        )
        return response.data;
    }
)

export const PostSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchAllPost.pending, (state) =>{
            state.isLoading = true;
        })
        .addCase(fetchAllPost.fulfilled, (state, action) => {
            state.isLoading = false;
            state.postList = action.payload.data;
        })
        .addCase(fetchAllPost.rejected, (state) => {
            state.isLoading = false;
            state.postList = []
        })
    }
})

export default PostSlice.reducer