import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios"

const initialState = {
    isLoading: true,
    postList: []
}

export const createPost = createAsyncThunk(
    '/post/createPost',
    async (FormData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                "http://localhost:5000/api/post/createPost",
                FormData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
)

export const fetchAllPost = createAsyncThunk(
    "/post/get",
    async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/post/get"
            )
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
)

export const deletePost = createAsyncThunk(
    '/post/delete',
    async (id) => {
        const response = await axios.delete(`http://localhost:5000/api/post/delete/${id}`)
        return id;
    }
)

export const PostSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllPost.pending, (state) => {
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
            .addCase(createPost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.postList.unshift(action.payload.data);
            })
            .addCase(createPost.rejected, (state, action) => {
                state.isLoading = false;
            })
            .addCase(deletePost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.postList = state.postList.filter((post) => post._id !== action.payload); 
            })
            .addCase(deletePost.rejected, (state) => {
                state.isLoading = false;
            });
    }
})

export default PostSlice.reducer