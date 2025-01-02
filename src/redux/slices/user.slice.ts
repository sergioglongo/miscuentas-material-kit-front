import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: {},
    isAuthorized: false,
    accessToken: '',
    uiState:{},
    params:{},
  },
  reducers: {
    setUser: (_state, action) => action.payload,
    updateUser: (state, action) => ({ ...state, ...action.payload }),
    updateUiState: (state, action) => ({ ...state, uiState: { ...state.uiState, ...action.payload } }),
    updateParams: (state, action) => ({ ...state, params: { ...state.params, ...action.payload } }),
  },
})

// Action creators are generated for each case reducer function
export const { setUser, updateUser, updateUiState, updateParams } = userSlice.actions

export default userSlice.reducer