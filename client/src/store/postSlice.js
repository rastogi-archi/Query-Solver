import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios"

const initialState = {
    isLoading: true
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

export const PostSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
    }
})

export default PostSlice.reducer