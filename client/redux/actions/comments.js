import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../apiBackend'

// Get all comments
export const getAllComments = createAsyncThunk(
  'getAllComments/comments',
  async () => {
    try {
      const { data } = await axiosInstance.get('/comments')
      return data
    } catch (error) {
      throw new Error(error)
    }
  }
)

// Get all comments by post id
export const getAllCommentsByPostId = createAsyncThunk(
  'getAllCommentsByPostId/comments',
  async (postId) => {
    try {
      const { data } = await axiosInstance.get(`/comments/post/${postId}`)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }
)

// Get comment by id
export const getCommentById = createAsyncThunk(
  'getCommentById/comments',
  async (commentId) => {
    try {
      const { data } = await axiosInstance.get(`/comments/${commentId}`)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }
)

// Like comment by id
export const likeComment = createAsyncThunk(
  'likeComment/comments',
  async ({ commentId, body }) => {
    try {
      const { data } = await axiosInstance.patch(
        `/comments/${commentId}/like`,
        body
      )
      return data
    } catch (error) {
      throw new Error(error)
    }
  }
)

// Dislike comment by id
export const dislikeComment = createAsyncThunk(
  'dislikeComment/comments',
  async ({ commentId, body }) => {
    try {
      const { data } = await axiosInstance.patch(
        `/comments/${commentId}/dislike`,
        body
      )
      return data
    } catch (error) {
      throw new Error(error)
    }
  }
)

// Post comment
export const postComment = createAsyncThunk(
  'postComment/comments',
  async ({ userId, postId, comment }) => {
    try {
      const { data } = await axiosInstance.post(
        `/comments/${postId}/${userId}`,
        comment
      )
      return data
    } catch (error) {
      throw new Error(error)
    }
  }
)

// Send response to comment by id
export const sendResponseToCommentById = createAsyncThunk(
  'sendResponseToCommentById/comments',
  async ({ commentId, commentData }) => {
    try {
      const { data } = await axiosInstance.patch(
        `/comments/${commentId}/response`,
        commentData
      )
      return data
    } catch (error) {
      throw new Error(error)
    }
  }
)

// Patch comment by id
export const updateCommentById = createAsyncThunk(
  'updateCommentById/comments',
  async ({ commentId, commentData }) => {
    try {
      const { data } = await axiosInstance.patch(
        `/comments/${commentId}`,
        commentData
      )
      return data
    } catch (error) {
      throw new Error(error)
    }
  }
)

// Delete comment by id
export const deleteCommentById = createAsyncThunk(
  'deleteCommentById/comments',
  async (commentId) => {
    try {
      const { data } = await axiosInstance.delete(`/comments/${commentId}`)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }
)

// Get comment related data
export const getCommentRelatedData = createAsyncThunk(
  'getCommentRelatedData/comments',
  async (commentId) => {
    try {
      const { data } = await axiosInstance.post(
        `/comments/${commentId}/info-relation`
      )
      return data
    } catch (error) {
      throw new Error(error)
    }
  }
)
