import { createSlice } from '@reduxjs/toolkit'

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
      .addCase(markAsRead.fulfilled, (state, action) => {
        const messageId = action.payload.id;
        state.messages = state.messages.map(message => {
          if (message.id === messageId) {
            message.read = true;
          }
          return message;
        });
      });
  }
})

export const { setMessage, setAllMessagesFromContact } = chatsSlices.actions

export default chatsSlices.reducer
