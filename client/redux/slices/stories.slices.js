import { createSlice } from '@reduxjs/toolkit'
import { getAllStories, getAllUserStories } from '../actions/stories';

export const storiesSlices = createSlice({
  name: 'stories',
  initialState: {
    allStories: [],
    userStories: [],
    loading: false,
    error: null,
  },
  reducers: {
    updateStory: (state, action) => {
      state.allStories = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
    // =================== GET ALL STORIES =================== 
      .addCase(getAllStories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllStories.fulfilled, (state, action) => {
        state.loading = false;
        state.allStories = action.payload;
      })
      .addCase(getAllStories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // =================== GET ALL USER STORIES =================== 
      .addCase(getAllUserStories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUserStories.fulfilled, (state, action) => {
        state.loading = false;
        state.userStories = action.payload;
      })
      .addCase(getAllUserStories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
    }
})

export const { updateStory } = storiesSlices.actions

export default storiesSlices.reducer
