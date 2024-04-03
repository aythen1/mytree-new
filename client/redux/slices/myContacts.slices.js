import { createSlice } from '@reduxjs/toolkit'

export const myContacts = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [
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

export default myContacts.reducer
