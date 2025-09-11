/**
 * Brice Jenkins
 * Copyright 2025
 */

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { startMonitoring } from '../RowingMachineBTSlice';

function Power ( {characteristic} ) {
    const [wattsText, setWattsText] = useState('--');
    const dispatch = useDispatch();
    
    useEffect(() => {
        
        const handleWattsChange = (e) => {
            const watts = parseWatts(e.target.value);
            setWattsText(watts);
        }; 

        const parseWatts = (value) => {
            const low = value.getUint8(3);
            const high = value.getUint8(4);
            const totalWatts = (low + (high * 256));
            return totalWatts;
        };

        if(characteristic) {
            characteristic.addEventListener(
            'characteristicvaluechanged',
            handleWattsChange)
        }

        dispatch(startMonitoring());
        console.log('monitoring wattage')

    }, [characteristic]);

    return (
        <div className='data-container'>
            <div className='data-reading'>
                <h1>{wattsText}</h1>
                <p>w</p>
            </div>
        </div>
    );
}

export default Power;