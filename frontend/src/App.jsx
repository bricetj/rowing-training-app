/**
 * Brice Jenkins
 */

import './App.css';
import HomePage from './pages/HomePage';
import ConnectDevices from './pages/ConnectDevices';
import WorkoutPage from './pages/WorkoutPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

function App() {
    const [hrChar, setHRChar] = useState();
    const [genStatusChar, setGenStatusChar] = useState();

    return (
        <div className='app'>
            <header>
                <h1>Rowing Training App</h1>
            </header>
            <Router>
                <Routes>
                    <Route path='/' element={<HomePage/>}></Route>
                    <Route path='/connect-devices' element={<ConnectDevices setHRChar={setHRChar} setGenStatusChar={setGenStatusChar}/>}></Route>
                    <Route path='/workout' element={<WorkoutPage hrChar={hrChar} genStatusChar={genStatusChar}/>}></Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
