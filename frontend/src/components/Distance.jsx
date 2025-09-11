/**
 * Brice Jenkins
 * Copyright 2025
 */

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { startMonitoring } from '../RowingMachineBTSlice';

function Distance ({ characteristic }) {
    const [distText, setDistText] = useState('--');
    const dispatch = useDispatch();
    
    useEffect(() => {
        // Defines event handler for change in distance.
        const handleDistChange = (e) => {
            const distance = parseDistance(e.target.value);
            setDistText(distance);
        }; 

        // Parses distance data sent from PM5 via General Status characteristic.
        const parseDistance = (value) => {
            const low = value.getUint8(3); // Value is in 0.1 m
            const mid = value.getUint8(4);
            const high = value.getUint8(5);

            // low, mid, and high values are added together as below to get total distance value.
            const totalDist = (low + (mid * 256) + (high * 65536)) / 10;
            return totalDist;
        };

        // Adds event listener for when characteristic value changes.
        if(characteristic) {
            characteristic.addEventListener(
            'characteristicvaluechanged',
            handleDistChange)
        }

        // Starts notifications from characteristic.
        dispatch(startMonitoring());
        console.log('monitoring distance')

    }, [characteristic]);

    return (
        <div>
            <div className='data-container'>
                <div className='data-reading'>
                    <h1>{distText}</h1>
                    <p>m</p>
                </div>
            </div>
        </div>
    );
}

export default Distance;