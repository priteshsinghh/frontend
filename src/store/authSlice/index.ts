
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


interface UserState {
    user: null | object;
    token: string | null;
    loading: boolean;
    isAuthenticated: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: null,
    token: null,
    loading: true,
    isAuthenticated: false,
    error: null,
};

interface LoginForm {
    identifier: string; // email or phone
    password: string;
}


// Register
export const registerUser = createAsyncThunk('/auth/register',
    async (formData) => {
        const response = await axios.post('http://localhost:5001/auth/register',
            formData,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }
        );
        return response.data; // make sure response data contains what you need
    }
);


//login
// export const loginUser = createAsyncThunk(
//     '/auth/login',
//     async (formData: LoginForm) => {
//         try {
//             const payload = formData.identifier.includes("@")
//                 ? { email: formData.identifier, password: formData.password } // If identifier contains "@", treat as email
//                 : { phoneNumber: formData.identifier, password: formData.password }; // Otherwise, treat as phone number

//             const response = await axios.post(
//                 "http://localhost:5001/auth/login",
//                 payload,
//                 { withCredentials: true }
//             );

//             console.log(response);

//             if (response.data.status === "ok" && response.data.data) {
//                 const token = response.data.data.token;
//                 const userRole = response.data.data.userRole;

//                 console.log("token and userrole", token, userRole);

//                 localStorage.setItem("token", token);
//                 localStorage.setItem("userRole", userRole);
//                 localStorage.setItem("islogin", JSON.stringify(true));

//                 // if (userRole === "seller") {
//                 //     return (window.location.href = "./admin/dashboard");
//                 // } else {
//                 //     window.location.href = "./shop/home";
//                 // }

//             } else {
//                 console.error("Login failed:", response.data.error);
//                 alert(response.data.error || "Login failed. Please try again.");
//             }
//         } catch (error) {
//             console.error("An error occurred during login:", error);
//             alert("An error occurred. Please try again later.");
//         }

//     }
// );





//logout 
export const logoutUser = createAsyncThunk(
    "/auth/logout",

    async () => {
        const response = await axios.post(
            "http://localhost:5001/auth/logout",
            {},
            {
                withCredentials: true,
            }
        );

        return response.data;
    }
);



//checkauth
// export const checkAuth = createAsyncThunk('/auth/checkAuth',
//     async () => {
//         const response = await axios.get('http://localhost:5001/auth/check-auth',
//             {
//                 withCredentials: true,
//                 headers: {
//                     'Cache-Control': 'np-store, no-cache, must-revalidate, proxy-revalidate'
//                 }
//             }

//         )
//         return response.data;
//     }
// )

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerUser.fulfilled, (state, _action) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = action.error.message || "registration failed";
            })
            // .addCase(loginUser.pending, (state) => {
            //     state.loading = true;
            // })
            // .addCase(loginUser.fulfilled, (state, action) => {

            //     state.loading = false;
            //     state.user = action.payload.success ? action.payload.user : null;
            //     state.isAuthenticated = action.payload.success;
            // })
            // .addCase(loginUser.rejected, (state, action) => {
            //     state.loading = false;
            //     state.user = null;
            //     state.error = action.error.message || "login failed";
            // })
            // .addCase(checkAuth.pending, (state) => {
            //     state.loading = true;
            // })
            // .addCase(checkAuth.fulfilled, (state, action) => {
            //     console.log("login payload", action.payload);

            //     state.loading = false;
            //     state.user = action.payload.success ? action.payload.user : null;
            //     state.isAuthenticated = action.payload.success;
            // })
            // .addCase(checkAuth.rejected, (state, _action) => {
            //     state.loading = true;
            //     state.user = null;
            //     state.isAuthenticated = false;
            // })
            .addCase(logoutUser.fulfilled, (state, _action) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
            });
    }
});


export default authSlice.reducer;
