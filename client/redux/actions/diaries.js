import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../apiBackend'

// Get all diaries
export const getAllDiaries = createAsyncThunk(
  'getAllDiaries/diaries',
  async () => {
    try {
      const { data } = await axiosInstance.get(`/diary`)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }
)
// Get diary by id
export const getDiaryById = createAsyncThunk(
  'getDiaryById/diaries',
  async (diaryId) => {
    try {
      const { data } = await axiosInstance.get(`/diary/${diaryId}`)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }
)

// Get all user diaries
export const getAllUserDiaries = createAsyncThunk(
  'getAllUserDiaries/diaries',
  async (userId) => {
    console.log('getting diaries of', userId)
    try {
      const { data } = await axiosInstance.post(`/diary/user/diaries`, {
        creatorId: userId
      })
      console.log('RESPONSE FROM GETALLUSERDIARIES', data)
      return data
    } catch (error) {
      console.log('error from getuserdiaries', error)
    }
  }
)
// Get all user diaries by date or category
export const getUserDiariesByDateOrCategory = createAsyncThunk(
  'getUserDiariesByDateOrCategory/diaries',
  async (userId, date, category) => {
    try {
      const { data } = await axiosInstance.post(`/diary/filter`, {
        category,
        creatorId: userId,
        date: date
      })
      return data
    } catch (error) {
      throw new Error(error)
    }
  }
)
// Post diary
export const postDiary = createAsyncThunk(
  'postDiary/diaries',
  async (diary) => {
    try {
      const { data } = await axiosInstance.post(`/diary`, diary)
      console.log('RESPONSE FROM POSTDIARY', data)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }
)

// Patch diary by id
export const updateDiaryById = createAsyncThunk(
  'updateDiaryById/diaries',
  async ({ diaryId, diaryData }) => {
    console.log(`updating diary ${diaryId} with `, diaryData)
    try {
      const { data } = await axiosInstance.put(`/diary/${diaryId}`, diaryData)
      console.log('returning data from updatediary', data)
      return data
    } catch (error) {
      console.log('error from updatediary', error)
    }
  }
)

// Delete diary by id
export const deleteDiaryById = createAsyncThunk(
  'deleteDiaryById/diaries',
  async (diaryId) => {
    try {
      const { data } = await axiosInstance.delete(`/diary/${diaryId}`)
      return diaryId
    } catch (error) {
      throw new Error(error)
    }
  }
)
