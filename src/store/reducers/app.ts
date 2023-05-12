import { createSlice } from "@reduxjs/toolkit";

import { AppState } from "@/store";

import actions from "@/store/actions/app";
import fetch from "@/store/fetch/app";

import { App } from "@/store/types/app";

export const initialState: App = {
    menu: [
        {title: '', type: 'loading'},
        {title: '', type: 'loading'},
        {title: '', type: 'loading'},
        {title: '', type: 'loading'},
        {title: '', type: 'loading'},
    ],
    categories: [],
    basket: {
        items: [],
        total: 0,
    },
    favorites: [],
    status: 'initial',
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        ...actions,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetch.initialFetch.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetch.initialFetch.fulfilled, (state, action) => {
                
                if(action.payload.status === 'failed' || action.payload.categories.length === 0) {
                    
                    state.status = 'failed'
                    return;
                }

                state.menu = action.payload.menu
                state.categories = action.payload.categories
                state.basket = action.payload.basket
                state.status = action.payload.status ?? 'idle'
            })
            .addCase(fetch.initialFetch.rejected, (state, action) => {
                state.status = 'failed'
            })
    }
})

export const selectApp = (state: AppState) => state as App

export const {

} = appSlice.actions

export default appSlice.reducer