import { createSlice } from '@reduxjs/toolkit'
import {
  getAllDiaries,
  getAllUserDiaries,
  getUserDiariesByDateOrCategory
} from '../actions/diaries'

export const diariesSlices = createSlice({
  name: 'diaries',
  initialState: {
    allDiaries: [],
    userDiaries: [
      {
        id: 'asd',
        description: `🧠 Lo que he aprendido/hemos aprendido hoy…`
      },
      {
        id: 'asd1',
        description: `testing diario 2`
      }
    ],
    selectedDiary: {},
    loading: false,
    error: null
  },
  reducers: {
    updateDiaries: (state, action) => {
      state.allDiaries = action.payload
    },
    setSelectedDiary: (state, action) => {
      state.selectedDiary = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      // =================== GET ALL DIARIES ===================
      .addCase(getAllDiaries.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllDiaries.fulfilled, (state, action) => {
        state.loading = false
        state.allDiaries = action.payload
      })
      .addCase(getAllDiaries.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      // =================== GET ALL USER DIARIES ===================
      .addCase(getAllUserDiaries.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllUserDiaries.fulfilled, (state, action) => {
        state.loading = false
        state.userDiaries = action.payload
      })
      .addCase(getAllUserDiaries.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      // =================== GET ALL USER DIARIES ===================
      .addCase(getUserDiariesByDateOrCategory.pending, (state) => {
        state.loading = true
      })
      .addCase(getUserDiariesByDateOrCategory.fulfilled, (state, action) => {
        state.loading = false
        state.userDiaries = action.payload
      })
      .addCase(getUserDiariesByDateOrCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export const { updateDiaries, setSelectedDiary } = diariesSlices.actions

export default diariesSlices.reducer
