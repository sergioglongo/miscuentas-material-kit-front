import { createSlice } from '@reduxjs/toolkit'

export const unitsSlice = createSlice({
  name: 'units',
  initialState: {
    unitsList: <any>[],
    unitActive: {},
    unitMain: {},
  },
  reducers: {
    setUnits: (state, action) => ({ ...state, unitsList: action.payload }),
    updateUnit: (state, action) => {
      const updatedUnitsList = state.unitsList.map((unit: any) => {
        if (unit.id === action.payload.id) {
          return { ...unit, ...action.payload };
        }
        return unit;
      });
      return { ...state, unitsList: updatedUnitsList };
    },
    setUnitActive: (state, action) => ({ ...state, unitActive: action.payload }),
    setUnitMain: (state, action) => ({ ...state, unitMain: action.payload })
  },
})

// Action creators are generated for each case reducer function
export const { setUnits, setUnitActive, setUnitMain, updateUnit } = unitsSlice.actions

export default unitsSlice.reducer