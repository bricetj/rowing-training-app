/**
 * Brice Jenkins
 * Copyright 2025
 */

import { useState } from 'react';
import ErgImg from '../assets/images/concept2_rowerg.webp';
import { useDispatch } from 'react-redux';
import { requestDevice, getDeviceName, getGenStatusChar, getAddStatus1Char, getAddStrokeDataChar } from '../RowingMachineBTSlice';

function ConnectBTRower({ setIsStartBTNVis, setRowChars }) {
    const [connectBTNText, setConnectBTNText] = useState('Connect Rower');
    const [isConnected, setIsConnected] = useState(false);
    const [deviceName, setDeviceName] = useState('');

    // Variables defined to hold various rowing service characteristics.
    let genStatusChar;
    let addStatus1Char;
    let addStrokeDataChar;
    const rowCharsObj = {};

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
                    // Retrieves and stores General Status characteristic.
                    genStatusChar = dispatch(getGenStatusChar());
                    genStatusChar.then(function(result) {
                        genStatusChar = result.payload;
                        rowCharsObj.genStatusChar = genStatusChar;
                        console.log(genStatusChar);
                    })
                })
                .then(() => {
                    // Retrieves and stores Additional Status 1 characteristic.
                    addStatus1Char = dispatch(getAddStatus1Char());
                    addStatus1Char.then(function(result) {
                        addStatus1Char = result.payload;
                        rowCharsObj.addStatus1Char = addStatus1Char;
                        console.log(addStatus1Char);
                    })
                })
                .then(() => {
                    // Retrieves and stores Additional Stroke Data characteristic.
                    addStrokeDataChar = dispatch(getAddStrokeDataChar());
                    addStrokeDataChar.then(function(result) {
                        addStrokeDataChar = result.payload;
                        rowCharsObj.addStrokeDataChar = addStrokeDataChar;
                        console.log(addStrokeDataChar);
                    })
                })
                .then(() => {
                    // Updates object state variable so characteristics can be passed to components.
                    setRowChars(rowCharsObj);
                })
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