/**
 * Brice Jenkins
 * Copyright 2025
 */

import { useState, useEffect } from 'react';

function HeartRate ( { characteristic } ) {
    const [hrText, setHRText] = useState('--');

    useEffect(() => {
        // Defines event handler for changes in HR characteristic.
        const handleHRChange = (e) => {
            const parsedHR = parseHeartRate(e.target.value);
            setHRText(parsedHR);
        }; 

        // Parses HR data sent from BT HR device.
        const parseHeartRate = (value) => {
            const flag = value.getUint8(0); // First byte determines if value is 16 bit (1) or 8 bit (0).
            const isHR16Bits = (flag & 0x01) === 1;
            
            let heartRate;
            if (isHR16Bits) {
                heartRate = value.getUint16(1, true);
            } else {
                heartRate = value.getUint8(1);
            }
            return heartRate;
        };

        if(characteristic) {
            characteristic.addEventListener(
            'characteristicvaluechanged',
            handleHRChange)
        }
    }, [characteristic]);

    return (
        <div>
            <div className='data-container'>
                <div className='data-reading'>
                    <h1>{hrText}</h1>
                    <p>bpm</p>
                </div>
            </div>
        </div>
    );
}

export default HeartRate;