import { createSlice } from "@reduxjs/toolkit";
import {
  deleteDiaryById,
  getAllDiaries,
  getAllUserDiaries,
  getUserDiariesByDateOrCategory,
} from "../actions/diaries";

export const diariesSlices = createSlice({
  name: "diaries",
  initialState: {
    allDiaries: [],
    userDiaries: [],
    filterDiaries: [],

    selectedDiary: {},
    loading: false,
    error: null,
  },
  reducers: {
    updateDiaries: (state, action) => {
      state.allDiaries = action.payload;
    },
    setSelectedDiary: (state, action) => {
      state.selectedDiary = action.payload;
    },
    addUserDiary: (state, action) => {
      state.userDiaries = [...state.userDiaries, action.payload];
    },
    removeUserDiary: (state, action) => {
      const prevDiaries = [...state.userDiaries];
      state.userDiaries = prevDiaries.filter(
        (diary) => diary.id !== action.payload,
      );
    },
    clearDiaries: (state, action) => {
      (state.allDiaries = []),
        (state.userDiaries = []),
        (state.selectedDiary = {}),
        (state.loading = false),
        (state.error = null);
    },
  },
  extraReducers: (builder) => {
    builder
      // =================== GET ALL DIARIES ===================
      .addCase(getAllDiaries.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllDiaries.fulfilled, (state, action) => {
        state.loading = false;
        state.allDiaries = action.payload;
      })
      .addCase(getAllDiaries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // =================== GET ALL USER DIARIES ===================
      .addCase(getAllUserDiaries.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUserDiaries.fulfilled, (state, action) => {
        state.loading = false;
        state.userDiaries = action.payload;
      })
      .addCase(getAllUserDiaries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // =================== GET ALL USER DIARIES BY CATEGORY/DATE ===================
      .addCase(getUserDiariesByDateOrCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserDiariesByDateOrCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.filterDiaries = action.payload;
      })
      .addCase(getUserDiariesByDateOrCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // =================== DELETE DIARY BY ID ===================
      .addCase(deleteDiaryById.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDiaryById.fulfilled, (state, action) => {
        const actualAllDiaries = [...state.allDiaries];
        const actualUserDiaries = [...state.filterDiaries];
        state.loading = false;

        state.filterDiaries = actualUserDiaries.filter(
          (diary) => diary.id !== action.payload,
        );
      })
      .addCase(deleteDiaryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  updateDiaries,
  setSelectedDiary,
  clearDiaries,
  addUserDiary,
  removeUserDiary,
} = diariesSlices.actions;

export default diariesSlices.reducer;
