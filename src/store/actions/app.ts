import { PayloadAction } from "@reduxjs/toolkit";

import store from "@/store";

import { App } from "@/store/types/app";
import { initialFetch } from "@/store/fetch/app";

export const appInit = () => {
    store.dispatch(initialFetch() as any)
}

function update(state: App, payload: PayloadAction<any>) {
    return {
        ...state,
        ...payload,
    }
}

export default Object.freeze({
    update,
})

export type AppActions = 'update'