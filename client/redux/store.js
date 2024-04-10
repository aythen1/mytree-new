import { configureStore } from '@reduxjs/toolkit'
import storiesSlices from './slices/stories.slices'
import challengersSlices from './slices/challengers.slices'
import panelSlices from './slices/panel.slices'
import memoriesSlices from './slices/memories.slices'
import infantSlices from './slices/infant.slices'
import condolenceBookSlices from './slices/condolenceBook.slices'
import familySlices from './slices/family.slices'
import newspapersPublishedSlices from './slices/newspapersPublished.slices'
import chatsSlices from './slices/chats.slices'
import myContactsSlices from './slices/myContacts.slices'
import userSlices from './slices/user.slices'
export const store = configureStore({
  reducer: {
    stories: storiesSlices,
    challengers: challengersSlices,
    panel: panelSlices,
    memories: memoriesSlices,
    infants: infantSlices,
    book: condolenceBookSlices,
    family: familySlices,
    papers: newspapersPublishedSlices,
    chats: chatsSlices,
    contacts: myContactsSlices,
    users: userSlices
  }
})
