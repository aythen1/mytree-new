import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../apiBackend'

// Get all notifications
export const getAllNotifications = createAsyncThunk(
  'getAllNotifications/notifications',
  async () => {
    try {
      const { data } = await axiosInstance.get('/notification')
      // console.log('data from getAllNotifications: ', data)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }
)
// Get notification by id
export const getNotificationById = createAsyncThunk(
  'getNotificationById/notifications',
  async (notificationId) => {
    try {
      const { data } = await axiosInstance.get(
        `/notification/${notificationId}`
      )
      return data
    } catch (error) {
      throw new Error(error)
    }
  }
)

//   // Get all user notifications
// export const getAllUserNotifications = createAsyncThunk(
//     'getAllUserNotifications/notifications',
//     async (userId) => {
//       try {
//         const {data} = await axiosInstance.get(`/notification/user/${userId}`);
//         return data
//       } catch (error) {
//         throw new Error(error)
//       }
//     }
//   )

// Post notification
export const postNotification = createAsyncThunk(
  'postNotification/notifications',
  async (body) => {
    // console.log('body: ', body)
    try {
      const { data } = await axiosInstance.post(`/notification`, body)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }
)

// Patch notification by id
export const updateNotificationById = createAsyncThunk(
  'updateNotificationById/notifications',
  async ({ notificationId, notificationData }) => {
    try {
      const { data } = await axiosInstance.patch(
        `/notification/${notificationId}`,
        notificationData
      )
      return data
    } catch (error) {
      throw new Error(error)
    }
  }
)

// Delete notification by id
export const deleteNotificationById = createAsyncThunk(
  'deleteNotificationById/notifications',
  async (notificationId) => {
    try {
      const { data } = await axiosInstance.delete(
        `/notification/${notificationId}`
      )
      return data
    } catch (error) {
      throw new Error(error)
    }
  }
)

// Get notification related data
export const getNotificationRelatedData = createAsyncThunk(
  'getNotificationRelatedData/notifications',
  async (notificationId) => {
    try {
      const { data } = await axiosInstance.post(
        `/notification/${notificationId}/info-relation`
      )
      return data
    } catch (error) {
      throw new Error(error)
    }
  }
)
