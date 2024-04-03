import { createSlice } from '@reduxjs/toolkit'

export const condolenceBookSlices = createSlice({
  name: 'book',
  initialState: {
    condolences: [
      {
        day: '02',
        month: 'mayo',
        year: '2008',
        message:
          'Papá, fuiste un gran hombre, un gran esposo y sobre todo un gran padre. Te echaré mucho de menos'
      },
      {
        day: '02',
        month: 'mayo',
        year: '2008',
        message:
          'Papá, nunca olvidaré como me hiciste sentir, has sido un ejemplo tanto para mi como para todos.'
      },
      {
        day: '02',
        month: 'mayo',
        year: '2008',
        message:
          'Abuelo, nunca olvidaré cómo me hacías comer acelgas… me recuerdan a ti'
      },
      {
        day: '03',
        month: 'mayo',
        year: '2008',
        message:
          'Papá, fuiste un gran hombrey, un gran esposo y sobre todo un gran padre. Te echaré mucho de menos'
      },
      {
        day: '03',
        month: 'mayo',
        year: '2008',
        message:
          'Papá, nunca olvidaré comou me hiciste sentir, has sido un ejemplo tanto para mi como para todos.'
      },
      {
        day: '03',
        month: 'mayo',
        year: '2008',
        message:
          'Abuelo, nunca olvidarég cómo me hacías comer acelgas… me recuerdan a ti'
      }
    ]
  },
  reducers: {}
})

// export const {} = condolenceBookSlices.actions

export default condolenceBookSlices.reducer
