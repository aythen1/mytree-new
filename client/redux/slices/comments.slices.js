import { createSlice } from '@reduxjs/toolkit'
import { getAllComments, getAllCommentsByPostId } from '../actions/comments'

export const commentsSlices = createSlice({
  name: 'comments',
  initialState: {
    allComments: [],
    userComments: [],
    selectedPostComments: [],
    loading: false,
    error: null
  },
  reducers: {
    updateComment: (state, action) => {
      state.allComments = action.payload
    },
    updateSelectedPostComments: (state, action) => {
      state.selectedPostComments = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      // =================== GET ALL COMMENTS ===================
      .addCase(getAllComments.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllComments.fulfilled, (state, action) => {
        state.loading = false
        state.allComments = action.payload
      })
      .addCase(getAllComments.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      // =================== GET ALL COMMENTS BY POST ID ===================
      .addCase(getAllCommentsByPostId.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllCommentsByPostId.fulfilled, (state, action) => {
        state.loading = false
        state.selectedPostComments = action.payload
      })
      .addCase(getAllCommentsByPostId.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export const { updateComment, updateSelectedPostComments } =
  commentsSlices.actions

export default commentsSlices.reducer
