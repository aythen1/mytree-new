import { createSlice } from '@reduxjs/toolkit'
import { getAllComments } from '../actions/comments';

export const commentsSlices = createSlice({
  name: 'comments',
  initialState: {
    allComments: [],
    userComments: [],
    loading: false,
    error: null,
  },
  reducers: {
    updateComment: (state, action) => {
      state.allComments = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
    // =================== GET ALL COMMENTS =================== 
      .addCase(getAllComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllComments.fulfilled, (state, action) => {
        state.loading = false;
        state.allComments = action.payload;
      })
      .addCase(getAllComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
    }
})

export const { updateComment } = commentsSlices.actions

export default commentsSlices.reducer
