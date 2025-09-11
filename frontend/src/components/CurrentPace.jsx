/**
 * Brice Jenkins
 * Copyright 2025
 */

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { startMonitoring } from '../RowingMachineBTSlice';

function CurrentPace ({ characteristic }) {
    const [paceText, setPaceText] = useState('--');
    const dispatch = useDispatch();
    
    useEffect(() => {
        // Defines event handler for change in current pace data.
        const handlePaceChange = (e) => {
            const pace = parsePace(e.target.value);
            setPaceText(pace);
        }; 

        // Parses pace data sent from PM5.
        const parsePace = (value) => {
            const low = value.getUint8(7); // Value is in 0.01 sec.
            const high = value.getUint8(8);

            // low and high values are added as below to get current pace per 500m data.
            const totalSeconds = (low + (high * 256)) / 100;

            const totalMinutes = Math.floor(totalSeconds / 60);
            const remainingSec = Math.floor(totalSeconds % 60);

            // Formats data to 0:00 format.
            const formattedMin = String(totalMinutes).padStart(1, '0');
            const formattedSec = String(remainingSec).padStart(2, '0');
            const pace = `${formattedMin}:${formattedSec}`;

            return pace;
        };

        // Event listener added when the characteristic value changes.
        if(characteristic) {
            characteristic.addEventListener(
            'characteristicvaluechanged',
            handlePaceChange);
        }

        // Starts notifications from PM5 monitor.
        dispatch(startMonitoring());
        console.log('monitoring current pace');

    }, [characteristic]);
    
    return (
        <div className='data-container'>
            <div className='data-reading'>
                <h1>{paceText}</h1>
                <p>/500m</p>
            </div>
        </div>
    );
}

export default CurrentPace;