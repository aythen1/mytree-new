import { createSlice } from '@reduxjs/toolkit'

export const storiesSlices = createSlice({
  name: 'stories',
  initialState: {
    stories: [
      {
        name: 'You',
        image: require('../../assets/aatar.png')
      },
      {
        name: 'Maury',
        image: require('../../assets/aatar2.png')
      },
      {
        name: 'Marito',
        image: require('../../assets/aatar1.png')
      },
      { name: 'Alexander', image: require('../../assets/aatar2.png') },
      {
        name: 'Carlos',
        image: require('../../assets/aatar2.png')
      },
      {
        name: 'Carlees',
        image: require('../../assets/aatar1.png')
      },
      {
        name: 'Alma',
        image: require('../../assets/aatar1.png')
      },
      {
        name: 'Andres',
        image: require('../../assets/aatar1.png')
      },
      {
        name: 'Jaqueline',
        image: require('../../assets/aatar1.png')
      }
    ],
    story: {}
  },
  reducers: {}
})

export default storiesSlices.reducer
