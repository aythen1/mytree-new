import { createSlice } from '@reduxjs/toolkit'
import { getAllEvents, getAllUserEvents } from '../actions/events'

export const eventsSlices = createSlice({
  name: 'events',
  initialState: {
    allEvents: [],
    userEvents: [],
    loading: false,
    error: null
  },
  reducers: {
    updateAllEvents: (state, action) => {
      state.allEvents = action.payload
    },
    updateUserEvents: (state, action) => {
      state.userEvents = action.payload
    },
    clearEvents: (state, action) => {
      ;(state.allEvents = []),
        (state.userEvents = []),
        (state.loading = false),
        (state.error = null)
    }
  },
  extraReducers: (builder) => {
    builder
      // =================== GET ALL EVENTS ===================
      .addCase(getAllEvents.pending, (state) => {
        console.log('pending: ')
        state.loading = true
      })
      .addCase(getAllEvents.fulfilled, (state, action) => {
        state.loading = false
        state.allEvents = action.payload
      })
      .addCase(getAllEvents.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      // =================== GET USER EVENTS ===================
      .addCase(getAllUserEvents.pending, (state) => {
        console.log('pending: ')
        state.loading = true
      })
      .addCase(getAllUserEvents.fulfilled, (state, action) => {
        state.loading = false
        state.userEvents = action.payload
      })
      .addCase(getAllUserEvents.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export const { updateAllEvents, updateUserEvents, clearEvents } =
  eventsSlices.actions

export default eventsSlices.reducer
