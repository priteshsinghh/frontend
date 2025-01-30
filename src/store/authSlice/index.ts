
// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";


// interface UserState {
//     user: null | object;
//     token: string | null;
//     loading: boolean;
//     isAuthenticated: boolean;
//     error: string | null;
// }

// const initialState: UserState = {
//     user: null,
//     token: null,
//     loading: true,
//     isAuthenticated: false,
//     error: null,
// };


// //logout 
// export const logoutUser = createAsyncThunk(
//     "/auth/logout",

//     async () => {
//         const response = await axios.post(
//             "http://localhost:5001/auth/logout",
//             {},
//             {
//                 withCredentials: true,
//             }
//         );

//         return response.data;
//     }
// );


// const authSlice = createSlice({
//     name: "auth",
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             // .addCase(registerUser.pending, (state) => {
//             //     state.loading = true;
//             // })
//             // .addCase(registerUser.fulfilled, (state, _action) => {
//             //     state.loading = false;
//             //     state.user = null;
//             //     state.isAuthenticated = false;
//             // })
//             // .addCase(registerUser.rejected, (state, action) => {
//             //     state.loading = false;
//             //     state.user = null;
//             //     state.isAuthenticated = false;
//             //     state.error = action.error.message || "registration failed";
//             // })
//             .addCase(logoutUser.fulfilled, (state, _action) => {
//                 state.loading = false;
//                 state.user = null;
//                 state.isAuthenticated = false;
//             });
//     }
// });


// export default authSlice.reducer;
