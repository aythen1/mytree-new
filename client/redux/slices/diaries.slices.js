import { createSlice } from '@reduxjs/toolkit'
import {
  deleteDiaryById,
  getAllDiaries,
  getAllUserDiaries,
  getUserDiariesByDateOrCategory
} from '../actions/diaries'

export const diariesSlices = createSlice({
  name: 'diaries',
  initialState: {
    allDiaries: [],
    userDiaries: [
      // {
      //   id: 'asd',
      //   description: `🧠 Lo que he aprendido/hemos aprendido hoy…`
      // },
      // {
      //   id: 'asd1',
      //   description: `testing diario 2`
      // }
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
    },
    addUserDiary: (state, action) => {
      state.userDiaries = [...state.userDiaries, action.payload]
    },
    clearDiaries: (state, action) => {
      ;(state.allDiaries = []),
        (state.userDiaries = []),
        (state.selectedDiary = {}),
        (state.loading = false),
        (state.error = null)
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
        console.log('setting diaries to', action.payload)
        state.userDiaries = action.payload
      })
      .addCase(getAllUserDiaries.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      // =================== GET ALL USER DIARIES BY CATEGORY/DATE ===================
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
      // =================== DELETE DIARY BY ID ===================
      .addCase(deleteDiaryById.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteDiaryById.fulfilled, (state, action) => {
        const actualAllDiaries = [...state.allDiaries]
        const actualUserDiaries = [...state.userDiaries]
        state.loading = false
        state.allDiaries = actualAllDiaries.filter(
          (diary) => diary.id !== action.payload
        )
        state.userDiaries = actualUserDiaries.filter(
          (diary) => diary.id !== action.payload
        )
      })
      .addCase(deleteDiaryById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export const { updateDiaries, setSelectedDiary, clearDiaries, addUserDiary } =
  diariesSlices.actions

export default diariesSlices.reducer
