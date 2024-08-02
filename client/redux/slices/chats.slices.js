import { createSlice } from '@reduxjs/toolkit'
import { chatGroups, getChatHistory, getChatHistoryGroup, updateMessages } from '../actions/chat'

const clubSlices = createSlice({
  name: 'chats',
  initialState: {
    allMessages: [],
    allchats:[],
    groups: [],
    loading: false,
    error: false
  },
  reducers: {
    resetChatsSlices: (state, action) => {
      state.allMessages = []
      ;(state.loading = false), (state.error = false)
    },
    setAllMessages: (state, action) => {
      state.allMessages = action.payload
    },
    setAllChats: (state, action) => {
      state.allchats = action.payload
    },
    setAllConversationMessagesToRead: (state, action) => {
      const allToReaded = state.allMessages.map((message) => ({
        ...message,
        isReaded: true
      }))
      state.allMessages = allToReaded
    },
    clearChats: (state, action) => {
      ;(state.allMessages = []), (state.loading = false), (state.error = false)
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
      // Update allMessages-----------------
      .addCase(getChatHistoryGroup.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(getChatHistoryGroup.fulfilled, (state, action) => {
       
        state.loading = false
        state.allMessages = action.payload
        state.error = false
      })
      .addCase(getChatHistoryGroup.rejected, (state) => {
        state.loading = false
        state.error = true
      })
      // U
      .addCase(updateMessages.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(updateMessages.fulfilled, (state, action) => {
        state.loading = false
        state.allMessages = [action.payload, ...state.allMessages]
        state.error = false
      })
      .addCase(updateMessages.rejected, (state) => {
        state.loading = false
        state.error = true
      })
      //------------------
      .addCase(chatGroups.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(chatGroups.fulfilled, (state, action) => {
        state.loading = false
        state.groups = action.payload
        state.error = false
      })
      .addCase(chatGroups.rejected, (state) => {
        state.loading = false
        state.error = true
      })
  }
})

export const {
  setAllMessages,
  setAllConversationMessagesToRead,
  resetChatsSlices,
  clearChats,
  setAllChats
} = clubSlices.actions

export default clubSlices.reducer
