import { createSlice } from '@reduxjs/toolkit'

export const challengersSlices = createSlice({
  name: 'challengers',
  initialState: {
    mostVoted: [
      {
        nameFamiliar: 'Cristian',
        like: 70
      },
      {
        nameFamiliar: 'Maury',
        like: 50
      },
      {
        nameFamiliar: 'Marito',
        like: 40
      },
      {
        nameFamiliar: 'Alex',
        like: 30
      },
      {
        nameFamiliar: 'Javier',
        like: 28
      },
      {
        nameFamiliar: 'Pablo',
        like: 25
      },
      {
        nameFamiliar: 'Pepito',
        like: 23
      },
      {
        nameFamiliar: 'Jaimito',
        like: 20
      },
      {
        nameFamiliar: 'Gregorio',
        like: 16
      },
      {
        nameFamiliar: 'Andres',
        like: 14
      }
    ]
  },
  reducers: {}
})

export default challengersSlices.reducer
