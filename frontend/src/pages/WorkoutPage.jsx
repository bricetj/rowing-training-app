import Distance from "../components/Distance";
import HeartRate from "../components/HeartRate";
import StrokeRate from "../components/StrokeRate";
import Pace from "../components/Pace";
import Watts from "../components/Watts";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getHeartRateChar, startMonitoring } from '../heartRateBTSlice';

function WorkoutPage (hrChar) {

    return (
        <div className='workout-page'>
            <div className='connect-row'>
                <div className='connect-column'>
                    <div className='workout-element'>
                        <label>Distance<Distance></Distance></label>
                    </div>
                    <div className='workout-element'>
                        <label>Pace<Pace></Pace></label>
                    </div>
                    <div className='workout-element'>
                        <label>Watts<Watts></Watts></label>
                    </div>
                </div>
                <div className='connect-column'>
                    <div className='workout-element'>
                        <label>Stroke Rate<StrokeRate></StrokeRate></label>
                    </div>
                    <div className='workout-element'>
                        <label>Heart Rate<HeartRate heartRateChar={hrChar.hrChar}></HeartRate></label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkoutPage;