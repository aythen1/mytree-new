import { createSlice } from '@reduxjs/toolkit'
import { loadMessages, markAsRead } from '../actions/chat';

export const chatsSlices = createSlice({
  name: 'chats',
  initialState: {
    message: {},
    allMessagesFromContact: [],
    loading: false,
    error: null,
    messages: []
  },
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload
    },
    setAllMessagesFromContact: (state, action) => {
      state.allMessagesFromContact = state.message.contact()
    }
  },
  extraReducers: (builder) => {
    builder
    // =================== LOAD MESSAGES =================== 
      .addCase(loadMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(loadMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // =================== MARK AS READ =================== 
      .addCase(markAsRead.pending, (state) => {
        state.loading = true;
      })
      .addCase(markAsRead.fulfilled, (state, action) => {
        const messageId = action.payload.id;
        state.messages = state.messages.map(message => {
          if (message.id === messageId) {
            message.read = true;
          }
          return message;
        });
      })
      .addCase(markAsRead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // =================== MARK AS READ =================== 
    }
})

export const { setMessage, setAllMessagesFromContact } = chatsSlices.actions

export default chatsSlices.reducer
