import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { startMonitoring } from '../RowingMachineBTSlice';

function ElapsedTime ({ genStatusChar }) {
    const [timeText, setTimeText] = useState('--');
    const dispatch = useDispatch();
    
    useEffect(() => {
        
        const handleTimeChange = (e) => {
            const time = parseTime(e.target.value);
            setTimeText(time);
        }; 

        const parseTime = (value) => {
            const low = value.getUint8(0);
            const mid = value.getUint8(1);
            const high = value.getUint8(2);
            const totalSeconds = (low + (mid * 256) + (high * 65536)) / 100;
            const totalMinutes = Math.floor(totalSeconds / 60);
            const remainingSec = Math.floor(totalSeconds % 60);
            const formattedMin = String(totalMinutes).padStart(2, '0');
            const formattedSec = String(remainingSec).padStart(2, '0');
            const totalTime = `${formattedMin}:${formattedSec}`;

            return totalTime;
        };

        if(genStatusChar) {
            genStatusChar.addEventListener(
            'characteristicvaluechanged',
            handleTimeChange)
        }

        dispatch(startMonitoring());
        console.log('monitoring time')

    }, [genStatusChar]);

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