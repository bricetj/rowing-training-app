import { useState, useEffect } from 'react';


function HeartRate ({heartRateChar}) {
    const [hrText, setHRText] = useState('--');

    useEffect(() => {
        const handleHRChange = (e) => {
            const parsedHR = parseHeartRate(e.target.value);
            setHRText(parsedHR);
        }; 

        const parseHeartRate = (value) => {
            const flag = value.getUint8(0);
            const isHR16Bits = (flag & 0x01) === 1;
            
            let heartRate;
            if (isHR16Bits) {
                heartRate = value.getUint16(1, true);
            } else {
                heartRate = value.getUint8(1);
            }
            return heartRate;
        };

        if(heartRateChar) {
            heartRateChar.addEventListener(
            'characteristicvaluechanged',
            handleHRChange)
        }
    }, [heartRateChar]);

    return (
        <div>
            <div className='hr-container'>
                <div className='hr-reading'>
                    <h1>{hrText}</h1>
                </div>
            </div>
        </div>
    );
}

export default HeartRate;