import { configureStore } from "@reduxjs/toolkit";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import appReducer from "./reducers/app";

const persistConfig = {
    key: 'nextjs',
    storage,
}

const persistedReducer = persistReducer(persistConfig, appReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
    devTools: process.env.NODE_ENV !== 'production',
})

export const persistor = persistStore(store);

export default store

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch