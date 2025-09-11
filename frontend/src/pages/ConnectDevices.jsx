/**
 * Brice Jenkins
 * Copyright 2025
 */

import { Link } from "react-router-dom";
import { useState } from "react";
import ConnectBTHeartRate from "../components/ConnectBTHeartRate";
import ConnectBTRower from "../components/ConnectBTRower";

function ConnectDevices ({ setHRChar, setRowChars}) {
    const [isStartBTNVis, setIsStartBTNVis] = useState();

    return (
        <>
            <div className='connect-row'>
                <ConnectBTRower
                    setIsStartBTNVis={ setIsStartBTNVis }
                    setRowChars={ setRowChars }>
                </ConnectBTRower>
                <ConnectBTHeartRate
                    setIsStartBTNVis={ setIsStartBTNVis }
                    setHRChar={ setHRChar }>
                </ConnectBTHeartRate>
            </div>
            {isStartBTNVis && <Link to='/workout'><button>Start Workout</button></Link>}
        </>
    );
};

export default ConnectDevices;