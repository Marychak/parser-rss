import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import axios from '../../axios';

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
    const {data} = await axios.post('/auth/login', params);
    return data;
});

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
    const {data} = await axios.post('/auth/register', params);
    return data;
});

export const fetchAuthUser = createAsyncThunk('auth/fetchAuthUser', async () => {
    const {data} = await axios.get('/auth/user');
    return data;
});

const initialState = {
    data: null,
    loading: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
        },
    },
    extraReducers: {
        [fetchAuth.pending]: (state) => {
            state.loading = true;
            state.data = null;
        },
        [fetchAuth.fulfilled]: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        [fetchAuth.rejected]: (state) => {
            state.loading = false;
            state.data = null;
        },
        [fetchAuthUser.pending]: (state) => {
            state.loading = true;
            state.data = null;
        },
        [fetchAuthUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        [fetchAuthUser.rejected]: (state) => {
            state.loading = false;
            state.data = null;
        },
        [fetchRegister.pending]: (state) => {
            state.loading = true;
            state.data = null;
        },
        [fetchRegister.fulfilled]: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        [fetchRegister.rejected]: (state) => {
            state.loading = false;
            state.data = null;
        },
    },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);
export const selectIsUserLoading = (state) => state.auth.loading;

export const authReducer = authSlice.reducer;

export const {logout} = authSlice.actions;