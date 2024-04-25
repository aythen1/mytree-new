import { createSlice } from '@reduxjs/toolkit'
import { getAllStories, getAllUserStories } from '../actions/stories';
import { getAllNotifications } from '../actions/notifications';

export const notificationsSlices = createSlice({
  name: 'notifications',
  initialState: {
    allNotifications: [],
    userNotifications: [],
    loading: false,
    error: null,
  },
  reducers: {
    updateNotifications: (state, action) => {
      state.allNotifications = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
    // =================== GET ALL NOTIFICATIONS =================== 
      .addCase(getAllNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.allNotifications = action.payload;
      })
      .addCase(getAllNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
    }
})

 export const { updateNotifications } = notificationsSlices.actions

export default notificationsSlices.reducer
