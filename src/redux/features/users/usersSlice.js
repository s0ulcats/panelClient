import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../../utils/axios.js';

const initialState = {
    users: [],
    user: null,
    loading: false,
    error: null,
};

export const getAllUsers = createAsyncThunk('user/getAllUsers', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get('/users');
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Error fetching users');
    }
});

export const getActionsByUser = createAsyncThunk('user/getActionsByUser', async (username, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`/users/${username}/actions`);
        return data;  // Сохраняем полученные действия
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Error fetching actions');
    }
});


export const updateAccountData = createAsyncThunk('user/updateAccountData', async ({ id, params }) => {
    try {
        const { data } = await axios.put(`/users/${id}`, params);
        return data;
    } catch (error) {
        throw error;
    }
});


export const getUserById = createAsyncThunk('user/getUserById', async (id, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`/users/${id}`);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Error fetching user');
    }
});

export const deleteUserById = createAsyncThunk('user/deleteUserById', async (id, { rejectWithValue }) => {
    try {
        const { data } = await axios.delete(`/users/${id}`);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Error deleting user');
    }
});


export const usersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getActionsByUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getActionsByUser.fulfilled, (state, action) => {
                state.loading = false;
                state.actions = action.payload;  // Сохраняем полученные действия
            })
            .addCase(getActionsByUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getUserById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(getUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateAccountData.fulfilled, (state, action) => {
                state.user = action.payload;
            })
    },
});

export default usersSlice.reducer;