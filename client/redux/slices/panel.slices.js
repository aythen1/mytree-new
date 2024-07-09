import { createSlice } from '@reduxjs/toolkit'

export const panelSlices = createSlice({
  name: 'panel',
  initialState: {
    showPanel: false,
    panelAddFooter: false
  },
  reducers: {
    setPanel: (state, action) => {
      state.showPanel = action.payload
    },

    setPanelAddFooter: (state, action) => {
      state.panelAddFooter = action.payload
    },

    clearPanel: (state, action) => {
      ;(state.showPanel = false), (state.panelAddFooter = false)
    }
  }
})

export const { setPanelAddFooter, setPanel, clearPanel } = panelSlices.actions

export default panelSlices.reducer
