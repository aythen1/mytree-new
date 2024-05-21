import { createSlice } from '@reduxjs/toolkit'
import { getChatHistory, updateMessages } from '../actions/chat'

export const chatsSlices = createSlice({
  name: 'chats',
  initialState: {
    allMessages: []
  },
  reducers: {
    setAllMessages: (state, action) => {
      state.allMessages = action.payload
    },
    setAllConversationMessagesToRead: (state, action) => {
      const allToReaded = state.allMessages.map((message) => ({
        ...message,
        isReaded: true
      }))
      console.log('allToReaded', allToReaded)
      state.allMessages = allToReaded
    }
  },
  extraReducers: (builder) => {
    builder
      // Get chat history
      .addCase(getChatHistory.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(getChatHistory.fulfilled, (state, action) => {
        state.loading = false
        state.allMessages = action.payload
        state.error = false
      })
      .addCase(getChatHistory.rejected, (state) => {
        state.loading = false
        state.error = true
      })
      // Update allMessages
      .addCase(updateMessages.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(updateMessages.fulfilled, (state, action) => {
        console.log('message payload: ', action.payload)
        state.loading = false
        state.allMessages = [action.payload, ...state.allMessages]
        state.error = false
      })
      .addCase(updateMessages.rejected, (state) => {
        state.loading = false
        state.error = true
      })
  }
})

export const { setAllMessages, setAllConversationMessagesToRead } =
  chatsSlices.actions

export default chatsSlices.reducer
