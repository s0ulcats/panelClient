import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/axios.js";

const initialState = {
    user: null,
    token: null,
    isLoading: false,
    status: null,
}

export const registerUser = createAsyncThunk('auth/registerUser', async ({ username, password }) => {
    try {
        const { data } = await axios.post('/auth/register', { username, password });
        return data;  // Only return registration data, no login
    } catch (error) {
        console.log(error);
        const message = error.response?.data?.message || 'Registration failed';
        return { message };
    }
});


export const loginUser = createAsyncThunk('auth/loginUser', async ({ username, password }) => {
    try {
        const { data } = await axios.post('/auth/login', { username, password });
        if (data.token) {
            window.localStorage.setItem('token', data.token);
        }
        return data;
    } catch (error) {
        console.log(error);
        // Обработаем ошибки, полученные от сервера
        const message = error.response?.data?.message || 'Error with credentials';
        return { message };
    }
});

export const getMe = createAsyncThunk('auth/me', async () => {
    try {
        const { data } = await axios.post('/auth/me');
        return data;
    } catch (error) {
        console.log(error);
    }
});


export const getTokenLogs = createAsyncThunk('auth/getTokenLogs', async (username) => {
    const response = await axios.get(`http://145.223.23.122:3001/api/auth/users/${username}/tokens`);
    return response.data;
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isLoading = false;
            state.status = null;
            window.localStorage.removeItem('token');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.status = action.payload?.message || 'Registration successful';
                state.user = action.payload?.user || null;
                state.token = action.payload?.token || null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = action.payload?.message || action.error.message || 'Registration failed';
                state.isLoading = false;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.status = action.payload?.message || 'Login successful';
                state.user = action.payload?.user || null;
                state.token = action.payload?.token || null;
                window.localStorage.setItem('token', action.payload?.token || '');
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = action.payload?.message || action.error.message || 'Login failed';
                state.isLoading = false;
            })
            .addCase(getMe.fulfilled, (state, action) => {
                state.isLoading = false;
                state.status = action.payload?.message || 'User data fetched';
                state.user = action.payload?.user || null;
                state.token = action.payload?.token || null;
            })
            .addCase(getMe.rejected, (state, action) => {
                state.status = action.payload?.message || action.error.message || 'Failed to fetch user data';
                state.isLoading = false;
            })
            .addCase(getTokenLogs.pending, (state) => {
                state.isLoading = true;
                state.status = null;
            })
            .addCase(getTokenLogs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tokenLogs = action.payload;  // Save token logs
            })
            .addCase(getTokenLogs.rejected, (state, action) => {
                state.isLoading = false;
                state.status = action.payload || 'Failed to fetch token logs';
            })
    },
});

export const checkIsAuth = (state) => Boolean(state.auth.token);
export const { logout } = authSlice.actions;
export default authSlice.reducer;