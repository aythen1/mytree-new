import { createAsyncThunk } from '@reduxjs/toolkit';

// Get all stories
export const getAllStories = createAsyncThunk(
    'getAllStories/stories',
    async () => {
      try {
        const {data} = await axios.get(`/histories`);
        return data
      } catch (error) {
        throw new Error(error)
      }
    }
  )
  // Get story by id
export const getStoryById = createAsyncThunk(
    'getStoryById/stories',
    async (storyId) => {
      try {
        const {data} = await axios.get(`/histories/${storyId}`);
        return data
      } catch (error) {
        throw new Error(error)
      }
    }
  )

  // Get all user stories
export const getAllUserStories = createAsyncThunk(
    'getAllUserStories/stories',
    async (userId) => {
      try {
        const {data} = await axios.get(`/histories/user/${userId}`);
        return data
      } catch (error) {
        throw new Error(error)
      }
    }
  )
  // Post story
export const postStory = createAsyncThunk(
    'getAllUserStories/stories',
    async (story) => {
      try {
        const {data} = await axios.post(`/histories`,story);
        return data
      } catch (error) {
        throw new Error(error)
      }
    }
  )
  
 // Patch story by id
 export const updateCommentById = createAsyncThunk('updateStoryById/stories', async ({storyId,storyData}) => {
    try {
      const { data } = await axiosInstance.patch(`/histories/${storyId}`,storyData)
      return data
    } catch (error) {
      throw new Error(error)
    }
  })

    // Delete story by id
export const deleteStoryById = createAsyncThunk('deleteStoryById/stories', async (storyId) => {
    try {
      const { data } = await axiosInstance.delete(`/histories/${storyId}`)
      return data
    } catch (error) {
      throw new Error(error)
    }
  })

       // Get story related data
export const getStoryRelatedData = createAsyncThunk('getStoryRelatedData/stories', async (storyId) => {
    try {
      const { data } = await axiosInstance.post(`/histories/${storyId}/info-relation`)
      return data
    } catch (error) {
      throw new Error(error)
    }
  })