/**
 * Brice Jenkins
 * Copyright 2025
 */

import Distance from "../components/Distance";
import HeartRate from "../components/HeartRate";
import StrokeRate from "../components/StrokeRate";
import CurrentPace from "../components/CurrentPace";
import Power from "../components/Power";
import ElapsedTime from "../components/ElapsedTime";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';


function WorkoutPage ( {hrChar, rowChars} ) {
    // genStatusChar, addStatus1Char} ) {

    return (
        <div className='workout-page'>
            <div className='connect-row'>
                <div className='connect-column'>
                    <div className='workout-element'>
                        <label>Distance<Distance characteristic={rowChars.genStatusChar}></Distance></label>
                    </div>
                    <div className='workout-element'>
                        <label>Current Pace<CurrentPace characteristic={rowChars.addStatus1Char}></CurrentPace></label>
                    </div>
                    <div className='workout-element'>
                        <label>Power<Power characteristic={rowChars.addStrokeDataChar}></Power></label>
                    </div>
                </div>
                <div className='connect-column'>
                    <div className='workout-element'>
                        <label>Stroke Rate<StrokeRate characteristic={rowChars.addStatus1Char}></StrokeRate></label>
                    </div>
                    <div className='workout-element'>
                        <label>Time<ElapsedTime characteristic={rowChars.genStatusChar}></ElapsedTime></label>
                    </div>
                    <div className='workout-element'>
                        <label>Heart Rate<HeartRate characteristic={hrChar}></HeartRate></label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkoutPage;