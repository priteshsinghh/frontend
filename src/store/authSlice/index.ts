
import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    isLoading: true,
    user: null,
    token : null
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoading = false;
      state.isAuthenticated = true;
    },
    updateUser: (state, action) => {
      state.user = {...state.user, ...action.payload};  
    }
  },
});

export const { login, updateUser } = authSlice.actions;
export default authSlice.reducer;
