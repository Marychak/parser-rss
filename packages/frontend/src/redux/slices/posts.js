import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import axios from '../../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async ({pagination, sorting}) => {
    const sortParams = sorting[0]
    const params = {
        limit: pagination.pageSize,
        page: pagination.pageIndex,
        sortBy: sortParams.id,
        sortOrder: sortParams.desc ? 'desc' : 'asc'
    }
    const response = await axios.get('/posts', {params});
    return {totalCount: response.headers['x-total-count'], items: response.data}

});

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) =>
    axios.delete(`/posts/${id}`),
);

const initialState = {
    items: [],
    totalCount: 0,
    isLoading: false,
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        updatePosts: (state, action) => {
            state.items = state.items.map(item => item.id === action.payload.id ? action.payload : item);
        }
    },
    extraReducers: {
        [fetchPosts.pending]: (state) => {
            state.items = [];
            state.isLoading = true;
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.items = action.payload.items;
            state.totalCount = action.payload.totalCount;
            state.isLoading = false;
        },
        [fetchPosts.rejected]: (state) => {
            state.items = [];
            state.isLoading = false;
        },
    },
});

export const postsReducer = postsSlice.reducer;
export const {updatePosts} = postsSlice.actions