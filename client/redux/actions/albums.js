import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../apiBackend'

// Get all albums
export const getAllAlbums = createAsyncThunk(
  'getAllAlbums/albums',
  async () => {
    try {
      const { data } = await axiosInstance.get(`/albums`)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }
)

// Post an album
export const postAlbum = createAsyncThunk('postAlbum/albums', async (album) => {
  try {
    console.log('POSTING ALBUM WITH ', album)
    const { data } = await axiosInstance.post(`/albums`, album)
    return data
  } catch (error) {
    throw new Error(error)
  }
})

// Get album by id
export const getAlbumById = createAsyncThunk(
  'getAlbumById/albums',
  async (albumId) => {
    try {
      const { data } = await axiosInstance.get(`/albums/${albumId}`)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }
)

// Update album by id
export const updateAlbumById = createAsyncThunk(
  'updateAlbumById/albums',
  async ({ albumId, body }) => {
    try {
      const { data } = await axiosInstance.patch(`/albums/${albumId}`, body)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }
)

// Delete album by id
export const deleteAlbumById = createAsyncThunk(
  'deleteAlbumById/albums',
  async (albumId) => {
    try {
      const { data } = await axiosInstance.delete(`/albums/${albumId}`)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }
)

// Get all albums by creator id
export const getAllUserAlbums = createAsyncThunk(
  'getAllUserAlbums/albums',
  async (userId) => {
    console.log('GETTING ALBUMS OF USER', userId)
    try {
      const { data } = await axiosInstance.post(`/albums/by-creator`, {
        creatorId: userId
      })
      console.log('USER ALBUMS FROM ACTION', data)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }
)
