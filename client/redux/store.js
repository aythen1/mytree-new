import { configureStore } from '@reduxjs/toolkit'
import chatsSlices from './slices/chats.slices'
import userSlices from './slices/user.slices'
export const store = configureStore({
  reducer: {
    chats: chatsSlices,
    users: userSlices
  }
})
