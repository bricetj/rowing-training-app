/**
 * Brice Jenkins
 * Copyright 2025
 */

import { Link } from 'react-router-dom';

function HomePage () {
    return (
        <div>
            <Link to='/connect-devices'><button>Start Workout</button></Link>
        </div>
    );
};

export default HomePage;