import { createSlice } from '@reduxjs/toolkit'

export const unitsSlice = createSlice({
  name: 'units',
  initialState: {
    unitsList: [],
    unitActive: {},
  },
  reducers: {
    setUnits: (state, action) => ({...state , unitsList: action.payload}),
    setUnitActive: (state, action) => ({...state , unitActive: action.payload}) 
  },
})

// Action creators are generated for each case reducer function
export const { setUnits, setUnitActive } = unitsSlice.actions

export default unitsSlice.reducer