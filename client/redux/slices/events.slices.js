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
        console.log('PAYLOAD gAE: ', action.payload)
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
        console.log('PAYLOAD gUE: ', action.payload)
        state.loading = false
        state.userEvents = action.payload
      })
      .addCase(getAllUserEvents.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export const { updateAllEvents, updateUserEvents } = eventsSlices.actions

export default eventsSlices.reducer
