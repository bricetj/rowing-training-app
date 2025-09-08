/**
 * Brice Jenkins
 */

import { useState } from 'react';
import ErgImg from '../assets/images/concept2_rowerg.webp';
import { useDispatch } from 'react-redux';
import { requestDevice, getDeviceName, getGenStatusChar, startMonitoring } from '../RowingMachineBTSlice';
import Distance from './Distance';

let genStatusChar;

function ConnectBTRower({ setIsStartBTNVis, setGenStatusChar }) {
    const [connectBTNText, setConnectBTNText] = useState('Connect Rower');
    const [isConnected, setIsConnected] = useState(false);
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
                            setConnectBTNText('Rowing Machine Connected');
                            setIsConnected(true);
                            setIsStartBTNVis(true);
                        };
                        setDeviceName(result.payload);
                    })
                })
                .then(() => {
                    genStatusChar = dispatch(getGenStatusChar())
                    genStatusChar.then(function(result) {
                        genStatusChar = result.payload;
                        setGenStatusChar(genStatusChar);
                        console.log(genStatusChar);
                        // genStatusChar.addEventListener('characteristicvaluechanged', e => {
                        //     const value = e.target.value;
                        //     const low = value.getUint8(3);
                        //     const mid = value.getUint8(4);
                        //     const high = value.getUint8(5);
                        //     const totalDist = (low + (mid * 256) + (high * 65536)) / 10;
                        //     console.log(totalDist);
                        // })
                    })
                })
                // .then(() => {
                //     dispatch(startMonitoring());
                //     console.log('monitoring distance')
                // })
        }

    return (
        <div className='connect-column'>
            {!isConnected &&
            <div className='connect-btn-and-reading'>
                <div className='reading-text'>
                    <h1>--</h1>
                </div>
                <button onClick={connectToBTDevice}>{connectBTNText}</button>
            </div>  
            }
            {isConnected &&
            <div className='connect-btn-and-reading'>
                <img className='erg-img' src={ErgImg} alt="Concept 2 Row Erg"/>
                <button onClick={connectToBTDevice}>Rower Connected</button>
            </div> 
            }
            <div>
                <p>{deviceName}</p>
            </div>
        </div>
    );
}

export default ConnectBTRower;