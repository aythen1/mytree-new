import { createSlice } from '@reduxjs/toolkit'

export const familySlices = createSlice({
  name: 'family',
  initialState: {
    diaries: [
      {
        name: 'Maury'
      },
      {
        name: 'Marito'
      },
      {
        name: 'Alex'
      },
      {
        name: 'Carlos'
      },
      {
        name: 'Carlees'
      },
      {
        name: 'Cristian'
      }
    ]
  },
  reducers: {}
})

// export const {} = familySlices.actions

export default familySlices.reducer
