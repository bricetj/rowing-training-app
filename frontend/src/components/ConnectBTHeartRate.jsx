/**
 * Brice Jenkins
 * Copyright 2025
 */

import { useState } from 'react';
import HeartRate from './HeartRate';
import { useDispatch } from 'react-redux';
import { requestDevice, getDeviceName, getHeartRateChar, startMonitoring } from '../HeartRateBTSlice';

let hrChar;

function ConnectBTHeartRate ({ setIsStartBTNVis, setHRChar }) {
    const [connectBTNText, setConnectBTNText] = useState('Connect Heart Rate');
    const [deviceName, setDeviceName] = useState('');

    const dispatch = useDispatch();

    let name;

    // Thunks are dispatched synchronously to connect to the BT Heart Rate device.
    const connectToBTDevice = () => {
        // Requests HR devices and connects to chosen device.
        dispatch(requestDevice())
            .then(() => {
                name = dispatch(getDeviceName());
            })
            .then(() => {
                name.then(function(result) {
                    if (result.payload !== undefined) {
                        setConnectBTNText('HR Device Connected');
                        setIsStartBTNVis(true);
                    };
                    setDeviceName(result.payload);
                })
            })
            .then(() => {
                // Heart Rate characteristic is retrieved and stored.
                hrChar = dispatch(getHeartRateChar());
                hrChar.then(function(result) {
                    hrChar = result.payload;
                    setHRChar(hrChar);
                    console.log(hrChar);
                })
            })
            .then(() => {
                // Starts notifications from HR device.
                dispatch(startMonitoring());
            })
    }

    return (
        <div className='connect-column'>
            <div className='connect-btn-and-reading'>
                <div className='reading-text'>
                    <HeartRate
                        characteristic = {hrChar}
                    ></HeartRate>
                </div>
                <button onClick={connectToBTDevice}>{connectBTNText}</button>
            </div>
            <div>
                <p>{deviceName}</p>
            </div>
        </div>
    );
}

export default ConnectBTHeartRate;