/*
 * Brice Jenkins
 */


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for requesting and connecting a bluetooth (BT) rowing machine device via Web BT API.
export const requestDevice = createAsyncThunk(
    'rowingMachineBT/requestDevice',
    async () => {
        const device = await navigator.bluetooth.requestDevice({
            filters: [{
                services: ['ce060000-43e5-11e4-916c-0800200c9a66'] // Discovery Service
            }],
            optionalServices: [
                'ce060010-43e5-11e4-916c-0800200c9a66', // Information Service
                'ce060020-43e5-11e4-916c-0800200c9a66', // Control Service
                'ce060030-43e5-11e4-916c-0800200c9a66'  // Rowing Service
            ]
        });
        const server = await device.gatt.connect();
        const service = await server.getPrimaryService('ce060030-43e5-11e4-916c-0800200c9a66'); // Rowing
        const genStatusChar = await service.getCharacteristic('ce060031-43e5-11e4-916c-0800200c9a66'); //General Status Characteristic

        return {
            device: device,
            service: service,
            genStatusChar: genStatusChar
        };
    }
);

// Async thunk for getting the device name of the connected BT rowing machine device.
export const getDeviceName = createAsyncThunk(
    'rowingMachineBT/getDeviceName',
    async (payload, thunkAPI) => {
        const state = thunkAPI.getState();
        const deviceName = state.rowingMachineBT.connectedDevice.name;
        if (!deviceName) {
            throw new Error('No device connected.')
        }
        return deviceName;
    }
);

// Async thunk for getting the Interval Characteristic from the connected BT rowing machine device.
export const getGenStatusChar = createAsyncThunk(
    'rowingMachineBT/getGenStatusChar',
    async (payload, thunkAPI) => {
        const state = thunkAPI.getState();
        const genStatusChar = state.rowingMachineBT.genStatusChar;
        if (!genStatusChar) {
            throw new Error('No interval characteristic.')
        }
        return genStatusChar;
    }
);

// Async thunk to begin getting notifications from the HR BT Device.
export const startMonitoring = createAsyncThunk(
    'rowingMachineBT/startMonitoring',
    async (payload, thunkAPI) => {
        const state = thunkAPI.getState();
        const genStatusChar = state.rowingMachineBT.genStatusChar;
        if (!genStatusChar) {
            throw new Error('No general status characteristic.')
        }
        genStatusChar.startNotifications();
    }
);

// // Async thunk to begin getting notifications from the HR BT Device.
// export const stopMonitoring = createAsyncThunk(
//     'heartRateBT/stopMonitoring',
//     async (payload, thunkAPI) => {
//         const state = thunkAPI.getState();
//         const hrChar = state.heartRateBT.heartRateChar;
//         if (!hrChar) {
//             throw new Error('No heart rate characteristic.')
//         }
//         hrChar.stopNotifications();
//     }
// );

    // const calculateAvgHR = async () => {
    //     let total = 0;
    //     for (const heartRate of hrArray) {
    //         total += heartRate;
    //     };
    //     console.log(total);
    //     const avgHeartRate = total / hrArray.length;
    //     console.log(avgHeartRate);
    // } 


const rowingMachineBTSlice = createSlice({
    name: 'rowingMachineBT',
    initialState: {
        connectedDevice: null,
        genStatusChar: null,
        rowingState: 'inactive',
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
                state.genStatusChar = action.payload.genStatusChar;
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
                state.status = 'rowing machine data monitoring started';
            });
        // builder
        //     .addCase(stopMonitoring.fulfilled, (state) => {
        //         state.status = 'rowing machine data monitoring stopped';
        //     })
    },
})

export default rowingMachineBTSlice.reducer;