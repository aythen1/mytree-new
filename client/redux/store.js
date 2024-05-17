import { configureStore } from '@reduxjs/toolkit'
import chatsSlices from './slices/chats.slices'
import userSlices from './slices/user.slices'
import panelSlices from './slices/panel.slices'
import notificationsSlices from './slices/notifications.slices'
import postsSlices from './slices/posts.slices'
export const store = configureStore({
  reducer: {
    chats: chatsSlices,
    users: userSlices,
    posts: postsSlices,
    panel: panelSlices,
    notifications: notificationsSlices
  }
})
