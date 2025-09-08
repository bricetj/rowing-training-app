import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { startMonitoring } from '../RowingMachineBTSlice';

function Distance ({ genStatusChar }) {
    const [distText, setDistText] = useState('--');
    const dispatch = useDispatch();
    
    useEffect(() => {
        
        const handleDistChange = (e) => {
            const distance = parseDistance(e.target.value);
            setDistText(distance);
        }; 

        const parseDistance = (value) => {
            const low = value.getUint8(3);
            const mid = value.getUint8(4);
            const high = value.getUint8(5);
            const totalDist = (low + (mid * 256) + (high * 65536)) / 10;
            return totalDist;
        };

        if(genStatusChar) {
            genStatusChar.addEventListener(
            'characteristicvaluechanged',
            handleDistChange)
        }

        dispatch(startMonitoring());
        console.log('monitoring distance')

    }, [genStatusChar]);

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