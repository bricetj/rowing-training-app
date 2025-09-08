import { Link } from "react-router-dom";
import { useState } from "react";
import ConnectBTHeartRate from "../components/ConnectBTHeartRate";
import ConnectBTRower from "../components/ConnectBTRower";

function ConnectDevices ({ setHRChar, setGenStatusChar }) {
    const [isStartBTNVis, setIsStartBTNVis] = useState();

    return (
        <>
            <div className='connect-row'>
                <ConnectBTRower setIsStartBTNVis={ setIsStartBTNVis } setGenStatusChar={ setGenStatusChar }></ConnectBTRower>
                <ConnectBTHeartRate setIsStartBTNVis={ setIsStartBTNVis } setHRChar={ setHRChar }></ConnectBTHeartRate>
            </div>
            {isStartBTNVis && <Link to='/workout'><button>Start Workout</button></Link>}
        </>
    );
};

export default ConnectDevices;