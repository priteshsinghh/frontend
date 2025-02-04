
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
  },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;
