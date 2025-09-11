/**
 * Brice Jenkins
 * Copyright 2025
 */

import './App.css';
import HomePage from './pages/HomePage';
import ConnectDevices from './pages/ConnectDevices';
import WorkoutPage from './pages/WorkoutPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

function App() {
    const [hrChar, setHRChar] = useState();
    const [rowChars, setRowChars] = useState();
    // const [genStatusChar, setGenStatusChar] = useState();
    // const [addStatus1Char, setAddStatus1Char] = useState();

    return (
        <div className='app'>
            <header>
                <h1>Rowing Training App</h1>
            </header>
            <Router>
                <Routes>
                    <Route path='/' element={<HomePage/>}></Route>
                    <Route path='/connect-devices'
                        element={<ConnectDevices
                                    setHRChar={setHRChar}
                                    setRowChars={setRowChars}
                                    // setGenStatusChar={setGenStatusChar}
                                    // setAddStatus1Char={setAddStatus1Char}
                                    />
                                }>
                    </Route>
                    <Route path='/workout'
                        element={<WorkoutPage 
                                    hrChar={hrChar}
                                    rowChars={rowChars}
                                    // genStatusChar={genStatusChar}
                                    // addStatus1Char={addStatus1Char}
                                    />
                                }>
                    </Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
