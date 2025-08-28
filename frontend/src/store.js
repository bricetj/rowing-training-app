import { configureStore } from '@reduxjs/toolkit';
import heartRateBTReducer from './heartRateBTSlice.js';

const store = configureStore({
    reducer: {
        heartRateBT: heartRateBTReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: true,
            serializableCheck: false
        })
});

export default store;