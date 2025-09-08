import { configureStore } from '@reduxjs/toolkit';
import heartRateBTReducer from './HeartRateBTSlice.js';
import rowingMachineBTReducer from './RowingMachineBTSlice.js';

const store = configureStore({
    reducer: {
        heartRateBT: heartRateBTReducer,
        rowingMachineBT: rowingMachineBTReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: true,
            serializableCheck: false
        })
});

export default store;