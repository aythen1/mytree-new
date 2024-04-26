import { configureStore } from '@reduxjs/toolkit'
import chatsSlices from './slices/chats.slices'
import userSlices from './slices/user.slices'
import panelSlices from './slices/panel.slices'
export const store = configureStore({
  reducer: {
    chats: chatsSlices,
    users: userSlices,
    panel: panelSlices
  }
})
