import { configureStore   } from '@reduxjs/toolkit'
import chatsSlices from './slices/chats.slices'
import userSlices from './slices/user.slices'
import panelSlices from './slices/panel.slices'
import notificationsSlices from './slices/notifications.slices'
import postsSlices from './slices/posts.slices'
import eventsSlices from './slices/events.slices'
import commentsSlices from './slices/comments.slices'
import diariesSlices from './slices/diaries.slices'
import albumsSlices from './slices/albums.slices'
import devToolsEnhancer from 'remote-redux-devtools';
import reactotron from '../ReactotronConfig'
import thunk  from "redux-thunk"


export const store = configureStore({
  reducer: {
    chats: chatsSlices,
    users: userSlices,
    posts: postsSlices,
    events: eventsSlices,
    panel: panelSlices,
    comments: commentsSlices,
    notifications: notificationsSlices,
    diaries: diariesSlices,
    albums: albumsSlices
  },

  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers().concat( __DEV__ ? reactotron.createEnhancer() : []),

})
