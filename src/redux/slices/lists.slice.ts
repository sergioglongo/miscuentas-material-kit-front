import { createSlice } from '@reduxjs/toolkit'

export const listsSlice = createSlice({
    name: 'lists',
    initialState: {
        areasList: [],
        categoriesList: [],
        accountsList: [],
        payMethodsList: [],
        unitsList: [],
    },
    reducers: {
        setAreasList: (state, action) => ({ ...state, areasList: action.payload }),
        setCategoriesList: (state, action) => ({ ...state, categoriesList: action.payload }),
        setAccountsList: (state, action) => ({ ...state, accountsList: action.payload }),
        setPayMethodsList: (state, action) => ({ ...state, payMethodsList: action.payload }),
        setUnitsList: (state, action) => ({ ...state, unitsList: action.payload }),
    },
})

// Action creators are generated for each case reducer function
export const {
    setAreasList,
    setCategoriesList,
    setAccountsList,
    setPayMethodsList,
    setUnitsList
} = listsSlice.actions

export default listsSlice.reducer