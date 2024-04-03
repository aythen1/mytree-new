import { createSlice } from '@reduxjs/toolkit'

export const newspapersPublishedSlices = createSlice({
  name: 'papers',
  initialState: {
    lastPapers: [
      {
        id: 1,
        date: '05 mar 2021',
        message:
          'Hoy hemos visitado en Tokio un restaurante que nos ha encantado etra vestibulum arcu nunc mattis. Mauris feugiat non interdum enim nullam ullamcorper. At enim egestas nisl pellentesque mattis turpis eu. Nisi facilisi turpis eget varius. Posuere ultricies   purus cursus massa consequat non diam convallis cursus. Integerfacilisi dignissim vitae augue risus. Convallis varius posuere hendrerit justo ut. Vitae tellus lacinia odio consequat sagittis. Scelerisque consequat ultrices euismod nibh integer erat.'
      },
      {
        id: 2,
        date: '08 mar 2021',
        message:
          'Hoy hemos visitado en Brasil un restaurante que nos ha encantado etra vestibulum arcu nunc mattis. Mauris feugiat non interdum enim nullam ullamcorper. At enim egestas nisl pellentesque mattis turpis eu. Nisi facilisi turpis eget varius. Posuere ultricies   purus cursus massa consequat non diam convallis cursus. Integerfacilisi dignissim vitae augue risus. Convallis varius posuere hendrerit justo ut. Vitae tellus lacinia odio consequat sagittis. Scelerisque consequat ultrices euismod nibh integer erat.'
      },
      {
        id: 3,
        date: '15 mar 2021',
        message:
          'Hoy hemos visitado en Dubai un restaurante que nos ha encantado etra vestibulum arcu nunc mattis. Mauris feugiat non interdum enim nullam ullamcorper. At enim egestas nisl pellentesque mattis turpis eu. Nisi facilisi turpis eget varius. Posuere ultricies   purus cursus massa consequat non diam convallis cursus. Integerfacilisi dignissim vitae augue risus. Convallis varius posuere hendrerit justo ut. Vitae tellus lacinia odio consequat sagittis. Scelerisque consequat ultrices euismod nibh integer erat.'
      },
      {
        id: 4,
        date: '03 jun 2022',
        message:
          'Hoy hemos visitado en Lisboa un restaurante que nos ha encantado etra vestibulum arcu nunc mattis. Mauris feugiat non interdum enim nullam ullamcorper. At enim egestas nisl pellentesque mattis turpis eu. Nisi facilisi turpis eget varius. Posuere ultricies   purus cursus massa consequat non diam convallis cursus. Integerfacilisi dignissim vitae augue risus. Convallis varius posuere hendrerit justo ut. Vitae tellus lacinia odio consequat sagittis. Scelerisque consequat ultrices euismod nibh integer erat.'
      }
    ],
    paper: {}
  },
  reducers: {
    setPaper: (state, action) => {
      state.paper = action.payload
    }
  }
})

export const { setPaper } = newspapersPublishedSlices.actions

export default newspapersPublishedSlices.reducer
