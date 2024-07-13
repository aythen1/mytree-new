import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../apiBackend'

// Get all posts
export const getAllPosts = createAsyncThunk('getAllPosts/posts', async () => {
  try {
    const { data } = await axiosInstance.get('/posts')
    return data
  } catch (error) {
    throw new Error(error)
  }
})

// Get user posts
export const getUserPosts = createAsyncThunk(
  'getUserPosts/posts',
  async (userId) => {
    try {
      const { data } = await axiosInstance.get(`/user/${userId}/posts`)
      return data
    } catch (error) {
      console.log(userId,"dataaaaaaaaaaa")
      throw new Error(error)
    }
  }
)

// Create new post
export const createPost = createAsyncThunk('createPost/posts', async (post) => {
  try {
    const { data } = await axiosInstance.post('/posts', post)
    return data
  } catch (error) {
    throw new Error(error)
  }
})

// Get post data by id
export const getPostById = createAsyncThunk(
  'getPostById/posts',
  async (postId) => {
    try {
      const { data } = await axiosInstance.get(`/posts/${postId}`)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }
)

// Patch post by id
export const updatePostById = createAsyncThunk(
  'updatePostById/posts',
  async ({ postId, postData }) => {
    try {
      const { data } = await axiosInstance.patch(`/posts/${postId}`, postData)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }
)

// Delete post by id
export const deletePostById = createAsyncThunk(
  'deletePostById/posts',
  async (postId) => {
    try {
      const { data } = await axiosInstance.delete(`/posts/${postId}`)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }
)

// Get post related data
export const getPostRelatedData = createAsyncThunk(
  'getPostRelatedData/posts',
  async (postId) => {
    try {
      const { data } = await axiosInstance.post(
        `/posts/${postId}/info-relation`
      )
      return data
    } catch (error) {
      throw new Error(error)
    }
  }
)
