/**
 * Brice Jenkins
 */

import { useState } from 'react';
import HeartRate from './HeartRate';
import { useDispatch } from 'react-redux';
import { requestDevice, getDeviceName, getHeartRateChar, startMonitoring } from '../heartRateBTSlice';

let hrChar;

function ConnectBTHeartRate ({setIsStartBTNVis, setHRChar}) {
    const [connectBTNText, setConnectBTNText] = useState('Connect Heart Rate');
    const [deviceName, setDeviceName] = useState('');

    const dispatch = useDispatch();

    let name;

    const connectToBTDevice = () => {
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
                hrChar = dispatch(getHeartRateChar())
                hrChar.then(function(result) {
                    hrChar = result.payload;
                    setHRChar(hrChar);
                    console.log(hrChar);
                })
            })
            .then(() => {
                dispatch(startMonitoring());
            })
    }

    return (
        <div className='connect-column'>
            <div className='connect-btn-and-reading'>
                <div className='reading-text'>
                    <HeartRate
                        heartRateChar = {hrChar}
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