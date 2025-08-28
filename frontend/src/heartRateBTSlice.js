/*
 * Brice Jenkins
 */


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for requesting and connecting a bluetooth (BT) HR device via Web BT API.
export const requestDevice = createAsyncThunk(
    'heartRateBT/requestDevice',
    async () => {
        const device = await navigator.bluetooth.requestDevice({
            filters: [{ services: ['heart_rate'] }],
            optionalServices: ['heart_rate']
        });
        const server = await device.gatt.connect();
        const service = await server.getPrimaryService('heart_rate');
        const heartRateChar = await service.getCharacteristic('heart_rate_measurement');

        return {device: device, hrChar: heartRateChar};
    }
);

// Async thunk for getting the device name of the connected BT HR device.
export const getDeviceName = createAsyncThunk(
    'heartRateBT/getDeviceName',
    async (payload, thunkAPI) => {
        const state = thunkAPI.getState();
        const deviceName = state.heartRateBT.connectedDevice.name;
        if (!deviceName) {
            throw new Error('No device connected.')
        }
        return deviceName;
    }
);

// Async thunk for getting the HR Characteristic from the connected BT HR device.
export const getHeartRateChar = createAsyncThunk(
    'heartRateBT/getHeartRateChar',
    async (payload, thunkAPI) => {
        const state = thunkAPI.getState();
        const hrChar = state.heartRateBT.heartRateChar;
        if (!hrChar) {
            throw new Error('No heart rate characteristic.')
        }
        return hrChar;
    }
);

// Async thunk to begin getting notifications from the HR BT Device.
export const startMonitoring = createAsyncThunk(
    'heartRateBT/startMonitoring',
    async (payload, thunkAPI) => {
        const state = thunkAPI.getState();
        const hrChar = state.heartRateBT.heartRateChar;
        if (!hrChar) {
            throw new Error('No heart rate characteristic.')
        }
        hrChar.startNotifications();
    }
);

// Async thunk to begin getting notifications from the HR BT Device.
export const stopMonitoring = createAsyncThunk(
    'heartRateBT/stopMonitoring',
    async (payload, thunkAPI) => {
        const state = thunkAPI.getState();
        const hrChar = state.heartRateBT.heartRateChar;
        if (!hrChar) {
            throw new Error('No heart rate characteristic.')
        }
        hrChar.stopNotifications();
    }
);

    // const calculateAvgHR = async () => {
    //     let total = 0;
    //     for (const heartRate of hrArray) {
    //         total += heartRate;
    //     };
    //     console.log(total);
    //     const avgHeartRate = total / hrArray.length;
    //     console.log(avgHeartRate);
    // } 


const heartRateBTSlice = createSlice({
    name: 'heartRateBT',
    initialState: {
        connectedDevice: null,
        heartRateChar: null,
        status: 'disconnected',
        error: null
    },
    reducers: {
        
    },
    extraReducers: (builder) => {
        // Manages state across BT connection lifecycle.
        builder
            .addCase(requestDevice.fulfilled, (state, action) => {
                state.connectedDevice = action.payload.device;
                state.heartRateChar = action.payload.hrChar;
                state.error = null;
                console.log("connected:", action.payload);
                state.status = 'device connected';
            })
            .addCase(requestDevice.pending, (state) => {
                // Does not update status if device is already connected.
                state.error = null;
                if (state.status !== 'device connected') {
                    state.status = 'devices requested';
                }
            })
            .addCase(requestDevice.rejected, (state) => {
                // Only updates status if device not already connected.
                if (state.status !== 'device connected') {
                    state.status = 'disconnected'
                }
                // Error printed if device window closed or there is an error connecting a device.
                state.error = 'error connecting device'
                console.log(state.error)
            });
        builder
            .addCase(startMonitoring.fulfilled, (state) => {
                state.status = 'heart rate monitoring started';
            });
        builder
            .addCase(stopMonitoring.fulfilled, (state) => {
                state.status = 'heart rate monitoring stopped';
            })
    },
})

export default heartRateBTSlice.reducer;