import { createSlice } from "@reduxjs/toolkit";
import {
  getAllNotifications,
  getAllUserNotifications,
} from "../actions/notifications";

export const notificationsSlices = createSlice({
  name: "notifications",
  initialState: {
    allNotifications: [],
    userNotifications: [],
    loading: false,
    error: null,
  },
  reducers: {
    updateNotifications: (state, action) => {
      state.allNotifications = action.payload;
    },
    clearNotifications: (state, action) => {
      (state.allNotifications = []),
        (state.userNotifications = []),
        (state.loading = false),
        (state.error = null);
    },
  },
  extraReducers: (builder) => {
    builder
      // =================== GET ALL NOTIFICATIONS ===================
      .addCase(getAllNotifications.pending, (state) => {
        // console.log('pending: ')
        state.loading = true;
      })
      .addCase(getAllNotifications.fulfilled, (state, action) => {
        // console.log('PAYLOAD gAN: ', action.payload)
        state.loading = false;
        state.allNotifications = action.payload;
      })
      .addCase(getAllNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // =================== GET ALL USER NOTIFICATIONS ===================
      .addCase(getAllUserNotifications.pending, (state) => {
        // console.log('pending: ')
        state.loading = true;
      })
      .addCase(getAllUserNotifications.fulfilled, (state, action) => {
        // console.log('PAYLOAD gAN: ', action.payload)
        state.loading = false;
        state.userNotifications = action.payload;
      })
      .addCase(getAllUserNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { updateNotifications, clearNotifications } =
  notificationsSlices.actions;

export default notificationsSlices.reducer;
