import { createSlice } from '@reduxjs/toolkit'

export const infantsSlices = createSlice({
  name: 'infants',
  initialState: {
    infant: {
      name: 'Cristian',
      mother: 'Ana',
      father: 'Norberto',
      birthdate: '15 de marzo de 1988'
    }
  },
  reducers: {}
})

// export const {} = memoriesslices.actions

export default infantsSlices.reducer
