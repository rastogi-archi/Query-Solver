import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios"
import { connectSocket } from "../utils/socket";

const initialState = {
    isLoading: true,
    isAuthenticated: false,
    user: null
}

const API_BASE_URL = "https://query-solver-backend.onrender.com";

export const registerUser = createAsyncThunk(
    "/auth/register",
    async (FormData) => {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/api/auth/register`,
                FormData,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            return response.data;
        } catch (error) {
            return (error.response?.data || { message: "Something went wrong" });
        }
    }
)

export const loginUser = createAsyncThunk(
  "/auth/login",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        formData,
        { withCredentials: true }
      );

      const user = response.data.user;
      connectSocket(user._id);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
    "/auth/logout",
    async () => {
        const response = await axios.post(
            `${API_BASE_URL}/api/auth/logout`,
            {},
            {
                withCredentials: true
            }
        )
        return response.data;
    }
)

export const checkAuth = createAsyncThunk(
    "/auth/checkAuth",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/api/auth/checkAuth`,
                {
                    withCredentials: true,
                }
            )
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Not Authenticated");
        }
    }
)

export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout : (state) => {
            state.user = null;
            state.isAuthenticated = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // Register
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(registerUser.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })

            // Login
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.success ? action.payload.user : null;
                state.isAuthenticated = action.payload.success;

                if (action.payload.success) {
                    localStorage.setItem("user", JSON.stringify(action.payload.user));
                }
            })
            .addCase(loginUser.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })

            // Logout
            .addCase(logoutUser.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
                localStorage.removeItem("user");
            })
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            });
    }
})

export const { logout } = AuthSlice.actions;
export default AuthSlice.reducer