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
// Register
export const registerUser = createAsyncThunk('/auth/register',
    async (formdata) => {
        const response = await axios.post('http://localhost:5001/auth/register',
            formdata,
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
            });
    }
});


export default authSlice.reducer;
