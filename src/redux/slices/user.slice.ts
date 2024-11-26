import { createSlice } from '@reduxjs/toolkit'
import { IUser } from 'src/config/types/types';


// const initialState: IUser = {
//   id: 0,
//   photo: "/src/assets/images/profile-picture-boy-1.jpeg",
//   firstname: "",
//   lastname: '',
//   is_active: true,
//   is_premium: false,
// }
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: {},
    isAuthorized: false,
    accessToken: ''
  },
  reducers: {
    setUser: (_state, action) => action.payload
    ,
    updateUser: (state, action) => ({ ...state, ...action.payload })
  },
})

// Action creators are generated for each case reducer function
export const { setUser, updateUser } = userSlice.actions

export default userSlice.reducer