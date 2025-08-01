import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL = "https://query-solver-backend.onrender.com";

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async ({ senderId, receiverId }) => {
    const res = await fetch(`${API_BASE_URL}/api/messages/${senderId}/${receiverId}`, {
      credentials: "include",
    });
    const data = await res.json();
    return data;
  }
);

export const saveMessage = createAsyncThunk(
  "messages/saveMessage",
  async (messageData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(messageData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(errorData.message || "Error saving message");
      }

      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);


const MessageSlice = createSlice({
  name: "messages",
  initialState: {
    messageList: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    addMessageRealTime: (state, action) => {
      state.messageList.push(action.payload);
    },
    clearMessages: (state) => {
      state.messageList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messageList = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(saveMessage.fulfilled, (state, action) => {
        state.messageList.push(action.payload);
      });
  },
});

export const { addMessageRealTime, clearMessages } = MessageSlice.actions;
export default MessageSlice.reducer;
