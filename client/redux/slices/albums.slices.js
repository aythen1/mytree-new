import { createSlice } from '@reduxjs/toolkit'
import { getAllStories, getAllUserStories } from '../actions/stories'
import { getAllAlbums, getAllUserAlbums } from '../actions/albums'

export const storiesSlices = createSlice({
  name: 'albums',
  initialState: {
    allAlbums: [],
    userAlbums: [],
    loading: false,
    error: null
  },
  reducers: {
    updateAlbums: (state, action) => {
      state.allAlbums = action.payload
    },
    clearAlbums: (state, action) => {
      ;(state.allAlbums = []),
        (state.userAlbums = []),
        (state.loading = false),
        (state.error = null)
    }
  },
  extraReducers: (builder) => {
    builder
      // =================== GET ALL ALBUMS ===================
      .addCase(getAllAlbums.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllAlbums.fulfilled, (state, action) => {
        state.loading = false
        state.allAlbums = action.payload
      })
      .addCase(getAllAlbums.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      // =================== GET ALL USER ALBUMS ===================
      .addCase(getAllUserAlbums.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllUserAlbums.fulfilled, (state, action) => {
        state.loading = false
        state.userAlbums = action.payload
      })
      .addCase(getAllUserAlbums.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export const { updateStory, clearAlbums } = storiesSlices.actions

export default storiesSlices.reducer
