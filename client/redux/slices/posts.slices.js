import { createSlice } from '@reduxjs/toolkit'
import { getAllPosts, getUserPosts } from '../actions/posts';

export const postsSlices = createSlice({
  name: 'posts',
  initialState: {
    allPosts: [],
    userPosts: [],
    loading: false,
    error: null,
  },
  reducers: {
    updateAllPosts: (state, action) => {
      state.allPosts = action.payload
    },
    updateUserPosts: (state, action) => {
      state.userPosts = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
    // =================== LOAD MESSAGES =================== 
      .addCase(getAllPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.allPosts = action.payload;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // =================== GET USER POSTS =================== 
      .addCase(getUserPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.userPosts = action.payload;
      })
      .addCase(getUserPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // =================== MARK AS READ =================== 
    }
})

export const { setMessage, setAllMessagesFromContact } = chatsSlices.actions

export default postsSlices.reducer
