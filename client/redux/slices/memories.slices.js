import { createSlice } from '@reduxjs/toolkit'
import { recents } from '../../screens/utils/memoryRecent'

export const memoriesslices = createSlice({
  name: 'memories',
  initialState: {
    memories: recents
  },
  reducers: {}
})

// export const {} = memoriesslices.actions

export default memoriesslices.reducer
