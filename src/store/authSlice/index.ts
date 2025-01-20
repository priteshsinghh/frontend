import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


interface UserState {
    user: null | object;
    token: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: null,
    token: null,
    loading: false,
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
                headers : {
                    'Content-Type' : 'multipart/form-data',
                }
            }
        );
        return response.data; // make sure response data contains what you need
    }
);


//login
export const loginUser = createAsyncThunk(
    '/auth/login',
    async (formData: LoginForm, { rejectWithValue }) => {
        try {
            const payload = formData.identifier.includes("@")
                ? { email: formData.identifier, password: formData.password } // If identifier contains "@", treat as email
                : { phoneNumber: formData.identifier, password: formData.password }; // Otherwise, treat as phone number

            const response = await axios.post(
                "http://localhost:5001/auth/login",
                payload,
                { withCredentials: true }
            );

            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.error || "Invalid credentials"
            );
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "registration failed";
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                console.log("action",action.payload);
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "login failed";
            });
    }
});


export default authSlice.reducer;
