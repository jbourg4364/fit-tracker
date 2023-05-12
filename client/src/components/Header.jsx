import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Initially set to false

    const handleLogout = () => {
        // Handle the logout logic here
        // After logging out, set isLoggedIn state to false
        setIsLoggedIn(false);
    }

    return (
        <div id='headerComponent'>
            <div className='headerLogo'>
                <img src="https://img.freepik.com/premium-vector/fitness-logo_686735-473.jpg?w=2000" alt="Slim Gems logo" />
                <h1>SLIM GEMS</h1>
            </div>
            <nav>
                <NavLink to="/" className="navLink">Home</NavLink>
                <NavLink to="/activities" className="navLink">Activities</NavLink>
                <NavLink to="/routines" className="navLink">Routines</NavLink>
            </nav>
            <div className='loginLogoutButtons'>
                {isLoggedIn ? (
                    <button onClick={handleLogout} className="authButton inverted">Logout</button>
                ) : (
                    <NavLink to="/login" className="authButton">Login</NavLink>
                )}
            </div>
        </div>
    );
};

export default Header;
