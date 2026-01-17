import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from '../../Helpers/axiosInstance';

const initialState = {
    messages: [
        { role: "bot", text: "Hello! Need help with a course or payment?" }
    ],
    isLoading: false,
    isOpen: false,
    error: null
};

export const sendChatMessage = createAsyncThunk(
    "/chat/sendMessage",
    async (userMessage, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/chat", { 
                message: userMessage 
            });
            return response.data.reply;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        toggleChat: (state) => {
            state.isOpen = !state.isOpen;
        },
        addUserMessage: (state, action) => {
            state.messages.push({ role: "user", text: action.payload });
        },
        clearChat: (state) => {
            state.messages = initialState.messages;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendChatMessage.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(sendChatMessage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.messages.push({ role: "bot", text: action.payload });
            })
            .addCase(sendChatMessage.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.messages.push({ role: "bot", text: "Error connecting to server." });
            });
    }
});

export const { toggleChat, addUserMessage, clearChat } = chatSlice.actions;
export default chatSlice.reducer;