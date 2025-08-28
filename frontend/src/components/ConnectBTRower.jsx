/**
 * Brice Jenkins
 */

import { useState } from 'react';
import ErgImg from '../assets/images/concept2_rowerg.webp';


function ConnectBTRower() {
    const [connectBTNText, setConnectBTNText] = useState('Connect Rower');
    const [isConnected, setIsConnected] = useState(false);
    const [deviceName, setDeviceName] = useState('');

    let rowDevice;
    let service;

    const requestDevice = async() => {
        rowDevice = await navigator.bluetooth.requestDevice({
            filters: [{
                services: ['ce060000-43e5-11e4-916c-0800200c9a66'] // Discovery Service
            }],
            optionalServices: [
                'ce060010-43e5-11e4-916c-0800200c9a66', // Information Service
                'ce060020-43e5-11e4-916c-0800200c9a66', // Control Service
                'ce060030-43e5-11e4-916c-0800200c9a66'  // Rowing Service
            ]
        });

        rowDevice.addEventListener('gattserverdisconnected', connectDevice);
    };

    const connectDevice = async() => {
        if(rowDevice.gatt.connected) return;
        
        const server = await rowDevice.gatt.connect();
        service = await server.getPrimaryService('ce060030-43e5-11e4-916c-0800200c9a66'); // Rowing
    };

    const connectToBTDevice = async() => {
        await requestDevice();
        setConnectBTNText('Connecting...');
        await connectDevice();
        setConnectBTNText('Rower Connected');
        setDeviceName(`${rowDevice.name}`)
        console.log(service.getCharacteristics());
        setIsConnected(true);
    };

    // const startMonitoring = async() => {
    //     await heartRateChar.startNotifications();
    // };

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
                <br/>
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