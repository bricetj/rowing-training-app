/**
 * Brice Jenkins
 * Copyright 2025
 */

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { startMonitoring } from '../RowingMachineBTSlice';

function ElapsedTime ({ characteristic }) {
    const [timeText, setTimeText] = useState('--');
    const dispatch = useDispatch();
    
    useEffect(() => {
        // Defines event handler for change in elapsed time.
        const handleTimeChange = (e) => {
            const time = parseTime(e.target.value);
            setTimeText(time);
        }; 
        
        // Parses elapsed time data from General Status characteristic.
        const parseTime = (value) => {
            const low = value.getUint8(0); // Value is in 0.01 sec
            const mid = value.getUint8(1);
            const high = value.getUint8(2);

            // low, mid, and high values are added together as below to get elapsed time data.
            const totalSeconds = (low + (mid * 256) + (high * 65536)) / 100;
            const totalMinutes = Math.floor(totalSeconds / 60);
            const remainingSec = Math.floor(totalSeconds % 60);

            // Formats values to 00:00 format.
            const formattedMin = String(totalMinutes).padStart(2, '0');
            const formattedSec = String(remainingSec).padStart(2, '0');
            const totalTime = `${formattedMin}:${formattedSec}`;

            return totalTime;
        };

        if(characteristic) {
            characteristic.addEventListener(
            'characteristicvaluechanged',
            handleTimeChange)
        }

        dispatch(startMonitoring());
        console.log('monitoring time')

    }, [characteristic]);

    return (
        <div>
            <div className='data-container'>
                <div className='data-reading'>
                    <h1>{timeText}</h1>
                </div>
            </div>
        </div>
    );
}

export default ElapsedTime;