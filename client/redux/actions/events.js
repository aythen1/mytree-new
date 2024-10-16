import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../apiBackend'

// Get all events
export const getAllEvents = createAsyncThunk(
  'getAllEvents/events',
  async () => {
    try {
      const { data } = await axiosInstance.get('/events')
      return data
    } catch (error) {
      throw new Error(error)
    }
  }
)

// Get all user events
export const getAllUserEvents = createAsyncThunk(
  'getAllUserEvents/events',
  async (userId) => {
    try {
      const { data } = await axiosInstance.get(`/events/by-creator/${userId}`)
      const filter = data?.map((e)=> e.type == "normal") || data
      return data
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const getAllUserInvitations = createAsyncThunk(
  'getAllUserInvitations/events',
  async (userId) => {
    try {
      const { data } = await axiosInstance.get(`/invitations/user/${userId}`)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }
)

// Post an event
export const createEvent = createAsyncThunk(
  'createEvent/events',
  async (body) => {
    try {
      const { data } = await axiosInstance.post('/events', body)
      return data
    } catch (error) {
      console.log('error from createEvent: ', error)
      throw new Error(error)
    }
  }
)

// Update event by id
export const updateEvent = createAsyncThunk(
  'updateEvent/events',
  async (eventId,body) => {
    try {
      const { data } = await axiosInstance.patch(`/events/${eventId}`, body)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const deleteEventById = createAsyncThunk(
  'deleteEventById/events',
  async (eventId) => {
    try {
      const { data } = await axiosInstance.delete(`/events/${eventId}`)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const deleteAllEvents = createAsyncThunk(
  'deleteEventById/events',
  async (eventId) => {
    try {
      const { data } = await axiosInstance.delete('/events/deleteAll')
      return data
    } catch (error) {
      throw new Error(error)
    }
  }
)
